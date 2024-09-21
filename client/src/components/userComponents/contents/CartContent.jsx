import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Image, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { CartDataContext } from '../../../contextApi/CartDataComponent'
import logo from '../../../assets/farmKettle.png'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'


function CartContent() {

  let { setCart,cart } = useContext(CartDataContext)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cartItem, setCartItem] = useState([])
  const [quantities, setQuantities] = useState()

  let getLoginToken = localStorage.getItem('loginToken')
  let decodedToken = jwtDecode(getLoginToken)
  let id = decodedToken.id

  const handleRemoveCart = async(productId) => {
    try {
      setLoading(true)
      let res = await AxiosService.put(`${ApiRoutes.REMOVECARTLIST.path}/${productId}/${id}`,{ headers : { 'Authentication' : `${getLoginToken}` }})
      if(res.status === 200) {
          setCart(cart-1)
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const handleClearCart = async() => {
    try {
      let res = await AxiosService.put(`${ApiRoutes.REMOVECARTITEMS.path}/${id}`,{ headers : { 'Authentication' : `${getLoginToken}` }})
     // console.log(res.data)
      if(res.status === 200) {
          setCart(0)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const getCartItem = async() => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GETCARTITEMS.path}/${id}`,{ headers : { 'Authorization' : `${getLoginToken}` }})
      let result = res.data.cartItems
      let productPrices = result.map((e) => e.price)
      if (res.status === 200) {
        setCartItem(result)
        result.length > 0 && setCart(result.length)
        setQuantity(result.productQuantity)
      }  
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const handleQuantityChange = async(productId, change) => {
    let quantityVal = {
      value : change
    }
    try {
      let res = await AxiosService.put(`${ApiRoutes.UPDATEQUANTITY.path}/${productId}/${id}`,quantityVal,{ headers : { 'Authentication' : `${getLoginToken}` }})
      let result = res.data.quantity
      setQuantities(result.productQuantity)
      if(result.productQuantity === 0){
        handleRemoveCart(result._id)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const cummulativePrice = cartItem.reduce((preve,curr)=> preve + ((curr.productQuantity)* curr?.productPrice) ,0)

  const handleBuyNow = async(price) => {
    let productData = {
      // products : cartItem,
      amount : price*100,
      currency: "INR",
      receipt : "receipt_11",
      product : cartItem.map((e) => ({
        productId : e._id,
        productTitle : e.productTitle,
        productQuantity : e.productQuantity,
        productPrice : e.productPrice,
        productImage : e.productImage,
        productWeight : e.productWeight,
      }))
    }
    try {
      let res = await AxiosService.post(`${ApiRoutes.ORDER.path}/${id}`,productData, {
        headers : {
            'Authorization' : `${getLoginToken}`,
            "Content-Type" : 'application/json'
        }
      })
      let orderData = res.data.orderData
      let order = res.data.order
      var options = {
        "key": import.meta.env.VITE_RP_KEY, // Enter the Key ID generated from the Dashboard
        "amount": price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "The CrazyNyt", //your business name
        "description": "Test Transaction",
        "image": {logo},
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response){
          const responseBody = {...response}
          let res = await AxiosService.post(`${ApiRoutes.VALIDATEORDER.path}/${order.id}`,responseBody, {
              headers : {
                  'Authorization' : `${getLoginToken}`,
                  "Content-Type" : 'application/json'
              }
          })
          const updateOrderDataResult = res.data
          let orderDatas = {
              orderId : updateOrderDataResult.orderId,
              paymentId : updateOrderDataResult.paymentId,
              id : orderData._id
          }
        //  console.log(orderDatas)
          let resData = await AxiosService.put(`${ApiRoutes.UPDATEORDER.path}`,orderDatas, {
              headers : {
                  'Authorization' : `${getLoginToken}`,
                  "Content-Type" : 'application/json'
              }
          })
        //  console.log(resData)
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": `${decodedToken.firstName} ${decodedToken.lastName}`, //your customer's name
          "email": `${decodedToken.email}`, 
          "contact": `${decodedToken.mobile}`  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#0E6B06"
        }
      };
      var rzp1 = new Razorpay(options)
      rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      })
      rzp1.open()
      handleClearCart()
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(()=> {
    getCartItem()
  },[])

  return  <>
    <Container className='my-5'>
      {
        cartItem.length > 0 ? cartItem.map((e,i)=> {
           return <Card className='cartItemCard d-flex mx-auto mb-3' key={i}>
              <div className='cartItemCardImage'>
                 <Image src={`${import.meta.env.VITE_API_BASE_URL}/${e.productImage}`} style={{width : "100%",height : "100%"}}/> 
               {/* <Image src={`https://farmkettle.onrender.com/${e.productImage}`} style={{width : "100%",height : "100%"}}/>*/}
              </div>
              <Card.Body className='cartItemCardBody d-flex my-3'>
                <div className='cartItemCardHeader d-flex'>
                  <div>
                    <Card.Title>{e.productTitle}<span style={{fontSize : "smaller"}}> ({e.productWeight})</span></Card.Title>
                    <div style={{fontSize : "smaller"}}>{e.productDescription}</div>
                    <div style={{color : "green"}}>{'\u20B9'}{e.productPrice}/pack (incl. tax)</div>
                  </div>
                  <div className='cartItemCardCount d-flex'>
                    <button type="button" className='btn btn-outline-danger' onClick={()=>{handleQuantityChange(e._id,-1)}} disabled={loading}>{loading ? <Spinner animation="border" /> : '-'}</button>
                    &nbsp;
                    <div className='py-1 cartQuantityText'>{e.productQuantity}</div>
                    &nbsp;
                    <button type="button" className='btn btn-outline-success' onClick={()=>{handleQuantityChange(e._id,1)}}>+</button>
                  </div>
                </div>

                <div className='cartItemCardQuantity d-flex'>
                  <Card.Text style={{fontSize :"smaller"}} className='mb-0'>Delivery in 1 week</Card.Text>
                  <h5 className="cartItemPrice">{'\u20B9'}{e.productPrice}/-</h5>
                </div>
              </Card.Body>
            </Card>
          })
          :
          <Card style={{width : "18rem"}} className='mx-auto'>
            <Card.Body className='text-center' style={{fontSize : "larger"}}>No Items in Your Cart</Card.Body>
          </Card>
      }
      <hr/>
      {
        cummulativePrice ? 
          <div className='summaryBlock mx-auto'>
            <h4>Summary</h4>
            <div className='d-flex justify-content-between'>
              <div>
                <p>Sub-Total</p>
                <p>Shipping</p>
                <hr />
                <p>Total Payable</p>
              </div>
              <div>
                <p className='text-end'>{'\u20B9'}{cummulativePrice}</p>
                <p className='text-end'>{'\u20B9'}50</p>
                <hr />
                <p className='text-end'>{'\u20B9'}{cummulativePrice + 50}</p>
              </div>
            </div>
            <Button style={{width : "100%"}} onClick={() => handleBuyNow(cummulativePrice + 50)}>Buy Now</Button>        
          </div>
          :
          null 
      }
    </Container>  
  </>
}

export default CartContent
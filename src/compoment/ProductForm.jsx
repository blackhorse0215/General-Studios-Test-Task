import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { addProductToCheckout } from './addtoCart'
import { creageSession } from "./createCheckoutID"

function ProductFrom(data){

    const [title, setTitle] = useState('');
    const [content, setContent] = useState([])
    const [sizeArray, setSizeArray] = useState([]);
    const [colorArray, setColorArray] = useState([]);
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [state, setState] = useState(false);
    const [id, setId] = useState('')


    // const closeDetails=()=>{
        var divs = document.querySelectorAll('.Closeproductdetails')
        var elements = document.querySelectorAll('.product_details')

        divs.forEach((div, index)=>{
            div.addEventListener('click', function(){
                elements[index].classList.remove('max-md:bottom-0')
                elements[index].classList.add('max-md:bottom-m400px')
            })
        })
    // }


    const handleAddToCart = (e) => {
        if(state ==true && id){
            const quantity = 1; // Adjust the quantity as needed
    
            fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: `${id}`,
                    quantity: quantity,
                }),
            })
            .then(response => response.json())
            .then(data => {
            console.log('Product added to cart:', data);
            document.querySelector('cart-drawer').classList.add('active');
            // Optionally, you can refresh the cart page or update the cart UI here
            })
            .catch(error => {
            console.error('Error adding product to cart:', error);
            });
        }
      };



    useEffect(()=>{
        setTitle(data.data.title);
        const string = data.data;
        if(string){
            const ary = JSON.parse(string.content); 
            setContent(ary);

            var s = [];
            var c = [];
            ary.map((item, index)=>{
                if(!s.includes(item.size)){
                    s.push(item.size);
                }
                if(!c.includes(item.color)){
                    c.push(item.color)
                }
            })

            setSizeArray(s);
            setColorArray(c);
        }
    },[data])

    useEffect(()=>{
        for(let i = 0; i < content.length; i ++){
            if(content[i].size == size && content[i].color == color){
                if(content[i].available == true){
                    setId(content[i].id)
                    setState(true)
                    setPrice(content[i].price)
                    return;
                }
                else{
                    setId('')
                    setState(false)
                }
            }
            else{
                setId('')
                setState(false)
            }
        }
    },[size, color])

    useEffect(()=>{
        creageSession()
    },[])
    

    return (
        <div className={`relative flex-grow pl-100px pt-30px pr-30px max-lg:pl-30px max-lg:fixed max-lg:w-full max-lg:bg-gray-300 max-lg:z-20 max-lg:pb-100px max-lg:transition-all duration-1000 ease`}>
            <div className="relative w-full top-0 lg:border-t lg:border-solid lg:border-black">
                <p className="w-full h-60px border-b border-black border-solid flex justify-between max-lg:flex mb-0 min-lg:hidden
                ">
                    <span className="text-28px mt-2">{title}</span>   
                    <span className="Closeproductdetails flex items-end pb-20px text-16px">Close</span>
                </p>
                <div className="flex justify-between h-45px items-center border-b border-black border-solid">
                    <div className="flex gap-20px">
                        <p className="flex items-center mb-0 text-16px">Size:</p>
                        <select className='bg-inherit text-16px' onChange={(e)=>{setSize(e.target.value)}} name="" id="">
                            {
                                sizeArray? sizeArray.map((item, index)=>(
                                    <option value={item}>{item}</option>
                                ))
                                :
                                <></>
                            }
                        </select>
                    </div>
                    <a href='/' className='underline text-16px'>View Size Chart</a>
                </div>
                <div className="flex w-full justify-between border-b border-black border-solid h-45px">
                    <div className="gap-20px h-45px flex items-center">
                        <p className="mb-0 flex items-center text-16px">Color:</p>
                        <div className="flex gap-10px">
                            {
                                colorArray? colorArray.map((item, index)=>(
                                    <span className={`w-5 h-5 flex justify-center items-center ${color == item ? 'border border-black border-solid rounded-50%' : ''} `}><button onClick={(e)=>{setColor(e.target.value)}} value={item} style={{backgroundColor:`${item.toLowerCase()}`}} className={`h-4 w-4 rounded-50%`} ></button></span>
                                ))
                                :
                                <></>
                            }
                        </div>
                    </div>
                    <p className="flex items-center">{price}</p>
                </div>
                <button onClick={handleAddToCart} className={`mt-20px ${state == true ? 'bg-black cursor-pointer' : 'bg-gray-500 cursor-not-allowed'}  w-full h-60px flex items-center justify-center text-21px text-white`}>Buy now</button>
            </div>
        </div>
    )
}

export default ProductFrom;

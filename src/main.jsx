import { h, render } from 'preact';
import ProductForm from './compoment/ProductForm'
import './styles/main.css'

document.addEventListener('DOMContentLoaded', function(){
    const productforms = document.querySelectorAll('product-forms');

    productforms.forEach((product)=>{
        const title = product.getAttribute('title');
        const content  = product.getAttribute('content');

        render(<ProductForm data={{title:title, content:content}} />, product);
    })
})
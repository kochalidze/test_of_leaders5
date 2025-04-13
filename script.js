// IPA: https://fakestoreapi.com/products

const products = document.getElementById('products');
const cartCont = document.getElementById('cart');
const totalEle = document.getElementById('total');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

fetch('https://fakestoreapi.com/products')
	.then((res) => res.json())
	.then((p) => {
		p.forEach(el => {
			const card = document.createElement('div');
			card.className = 'card'
			card.innerHTML = `
			<img src='${el.image}' />
			<h4>${el.title}</h4>
			<p>$ ${el.price}</p>
			<button onclick='addToCart()'>Add to cart</button>
			`;
			products.appendChild(card);
		});
	})

function addToCart(product) {
	cart.push(product);
	localStorage.setItem('cart', JSON.stringify(cart));
	renderCart();
}
function renderCart() {
	cartCont.innerHTML = '';
	let total = 0;
	cart.forEach((i, index) => {
		total += i.price;
		const div = document.createElement('div');
		div.innerHTML = `
		${i.title}-$${i.price.toFixed(2)}
		<button onclick='removeFromCart(${index})'>Remove</button>
		`;
		cartCont.appendChild(div);
	});
	totalEle.innerHTML = `Total: $${total.toFixed(2)}`
}

function removeFromCart(index) {
	cart.splice(index, 1);
	localStorage.setItem('cart', JSON.stringify(cart));
	renderCart();
}

function clearCart(){
	cart = [];
	localStorage.removeItem('cart');
	renderCart()
}

renderCart();
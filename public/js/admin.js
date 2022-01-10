const deleteProduct = (button) => {
    const prodId = button.parentNode.querySelector('[name=productId]').value;
    const csrf = button.parentNode.querySelector('[name=_csrf]').value;
    const productElement = button.closest('article');
    fetch('/admin/product/' + prodId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf
        }
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        console.log(data);
        //productElement.remove();
        productElement.parentNode.removeChild(productElement);
    })
    .catch(err => console.log(err));
};


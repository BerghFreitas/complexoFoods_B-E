let carrinho = [];

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');

    document.getElementById(tabName).style.display = 'block';
}

function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
    } else {
        carrinho.splice(index, 1);
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let totalItens = 0;
    carrinho.forEach((item, index) => {
        totalItens += item.quantidade;
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');

        listItem.innerHTML = `
            ${item.nome} - R$ ${item.preco} x ${item.quantidade}
            <button class="remove-item" onclick="removerDoCarrinho(${index})">X</button>
        `;
        cartItems.appendChild(listItem);
    });

    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;

    // Atualiza a quantidade de itens no carrinho na navegação
    document.getElementById('cart-count').textContent = totalItens;
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}`);
    carrinho = [];
    atualizarCarrinho();
}
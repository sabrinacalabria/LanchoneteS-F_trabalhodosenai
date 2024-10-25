let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

const formFuncionarios = document.getElementById('form-funcionarios');
const formPedidos = document.getElementById('form-pedidos');
const listaFuncionarios = document.getElementById('lista-funcionarios');
const listaPedidos = document.getElementById('lista-pedidos');
const responsavelSelect = document.getElementById('responsavel');

function atualizarListaFuncionarios() {
    responsavelSelect.innerHTML = '<option value="" disabled selected>Selecione o Responsável</option>';
    funcionarios.forEach(funcionario => {
        const option = document.createElement('option');
        option.value = funcionario.nome;
        option.textContent = funcionario.nome;
        responsavelSelect.appendChild(option);
    });
}

function renderizarFuncionarios() {
    listaFuncionarios.innerHTML = '<h3>Funcionários Cadastrados:</h3>';
    funcionarios.forEach(funcionario => {
        const div = document.createElement('div');
        div.textContent = `Nome: ${funcionario.nome}, CPF: ${funcionario.cpf}, Cargo: ${funcionario.cargo}`;
        listaFuncionarios.appendChild(div);
    });
}

function renderizarPedidos() {
    listaPedidos.innerHTML = '<h3>Pedidos Cadastrados:</h3>';
    pedidos.forEach(pedido => {
        const div = document.createElement('div');
        div.textContent = `Pedido: ${pedido.nome}, Responsável: ${pedido.responsavel}, Status: ${pedido.status}`;
        listaPedidos.appendChild(div);
    });
}

formFuncionarios.addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const cargo = document.getElementById('cargo').value;

    if (cpf.length !== 11) {
        alert('O CPF deve ter 11 dígitos.');
        return;
    }

    const funcionario = { nome, cpf, cargo };
    funcionarios.push(funcionario);
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    
    atualizarListaFuncionarios();
    renderizarFuncionarios();
    formFuncionarios.reset(); 
});

formPedidos.addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('pedido').value;
    const descricao = document.getElementById('descricao').value;
    const responsavel = responsavelSelect.value;

    if (!responsavel) {
        alert('Selecione um responsável antes de adicionar o pedido.');
        return;
    }

    const status = document.getElementById('status').value;
    const pedido = { nome, descricao, responsavel, status };
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    
    renderizarPedidos();
    formPedidos.reset(); 
});

atualizarListaFuncionarios();
renderizarFuncionarios();
renderizarPedidos();

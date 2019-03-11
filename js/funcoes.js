window.onload=function(){
	listar();
	document.getElementById('frmCadastro').addEventListener('submit', adicionarOuAlterar);
	document.getElementById('frmCadastro').addEventListener('submit', listar);
}

var idAlterar = null;

//Botao cadastrar/salvar (verificação)
function adicionarOuAlterar(e){
	var nom = document.getElementById('txtNome').value;
	var ra = document.getElementById('txtRazaoSocial').value;
	var tip = document.getElementById('txtTipoPessoa').value;
	var ce = document.getElementById('txtCEP').value;
	var en = document.getElementById('txtEndereco').value;
	var nume = document.getElementById('txtNumero').value;
	var bai = document.getElementById('txtBairro').value;
	var cid = document.getElementById('txtCidade').value;
	var est = document.getElementById('txtEstado').value;
	var mail = document.getElementById('txtEmail').value;
	var p = {
		nome : !nom ? "sem nome": nom,
		raz : !ra ? "sem razao social": ra,
		tipo : !tip ? "sem CPF/CNPJ": tip,
		cep : !ce ? "sem CEP": ce,
		end : !en ? "sem endereco": en,
		num : !nume ? "sem numero": nume,
		bairro : !bai ? "sem bairro": bai,
		cidade : !cid ? "sem cidade": cid,
		estado : !est ? "sem estado": est,
		email : !mail ? "sem email": mail
	}

	if(idAlterar == null)	
		adicionar(p);
	else if(idAlterar > 0)
		alterar(p);
	else
		alert("Ação desconhecida");	
	
	//Bloqueia a ação de atualização do navegador
	e.preventDefault();
}

function adicionar(p){	
	var pessoas = [];	
	var idValido = 1;	
	//Se já possuir o localStorage, adiciona na lista
	if(localStorage.getItem('value') !== null ){
		pessoas = JSON.parse(localStorage.getItem('value')); //Captura o array de objetos(JSON);
				
		if(pessoas.length > 0)
			idValido = 	(function obterIdValido() {	//Função Auto-executável
							 //Verificação de buracos entre os numeros
							for(var i = 0; i < pessoas.length; i++)
								if(pessoas[i].Id != i+1)
									return i + 1;							
							//Se nao achar, retorna o id posterior da ultima pessoa
							return pessoas[pessoas.length - 1].Id + 1;
						})();
	}	
	
	var pessoa = {
		Id: idValido,
		Nome: p.nome,
		Razao: p.raz,
		Tipo: p.tipo,
		Cep: p.cep,
		End: p.end,
		Num: p.num,
		Bairro: p.bairro,
		Cidade: p.cidade,
		Estado: p.estado,
		Email: p.email
	};
	
	//Adiciona o objeto ao ultimo indice do array
	pessoas.push(pessoa);	
	//Ordena o array pelo ID do objeto
	pessoas.sort(function(a,b) {
		return a.Id - b.Id;
	});			
	//Armazena no Localstorage
	localStorage.setItem('value', JSON.stringify(pessoas));	
	//Reseta os campos do formulario
	document.getElementById('frmCadastro').reset();	
}

function alterar(p){
	var btn = document.getElementById('btnCadastrarSalvar');	

	pessoas = JSON.parse(localStorage.getItem('value'));
	//Substitui as informaçoes
	for(var i = 0; i < pessoas.length; i++){
		if(pessoas[i].Id == idAlterar){
			pessoas[i].Nome = p.nome;
			pessoas[i].Razao = p.raz;
			pessoas[i].Tipo = p.tipo;
			pessoas[i].Cep = p.cep;
			pessoas[i].End = p.end;
			pessoas[i].Num = p.num;
			pessoas[i].Bairro = p.bairro;
			pessoas[i].Cidade = p.cidade;
			pessoas[i].Estado = p.estado;
			pessoas[i].Email = p.email;
			
			btn.value = "Cadastrar";
			idAlterar = null;

			localStorage.setItem('value', JSON.stringify(pessoas));	
			document.getElementById('frmCadastro').reset();			
			break;
		}
	}
}

//Botão Alterar
function prepararAlterar(idRow){	
	document.getElementById('btnCadastrarSalvar').value = "Salvar";
	
	var txtNome = document.getElementById('txtNome'),
	    txtRazaoSocial = document.getElementById('txtRazaoSocial'),
		txtTipoPessoa = document.getElementById('txtTipoPessoa'),
		txtCEP = document.getElementById('txtCEP'),
		txtEndereco = document.getElementById('txtEndereco'),
		txtNumero = document.getElementById('txtNumero'),
		txtBairro = document.getElementById('txtBairro'),
		txtCidade = document.getElementById('txtCidade'),
		txtEstado = document.getElementById('txtEstado'),
		txtEmail = document.getElementById('txtEmail');

	var pessoas = JSON.parse(localStorage.getItem('value'));
	for(var i = 0; i < pessoas.length; i++){
		if(pessoas[i].Id == idRow){			
			
			txtNome.value = pessoas[i].Nome;
			txtRazaoSocial.value = pessoas[i].Razao;
			txtTipoPessoa.value = pessoas[i].Tipo;
			txtCEP.value = pessoas[i].Cep;
			txtEndereco.value = pessoas[i].End;
			txtNumero.value = pessoas[i].Num;
			txtBairro.value = pessoas[i].Bairro;
			txtCidade.value = pessoas[i].Cidade;
			txtEstado.value = pessoas[i].Estado;
			txtEmail.value = pessoas[i].Email;
			
			//Recarrega a lista para limpar o th com background alterado
			listar();
			//Caso clicar vezes seguidas no botão alterar, coloca oID null
			idAlterar = null;
			if(idAlterar === null){
				//mudar o background da nova linha
				var th = document.getElementById("rowTable"+i);				
				th.className = "estadoAlteracao";				
			}

			//Atribuir o Id a variavel global
			idAlterar = pessoas[i].Id;
			break;
		}
	}
}

function excluir(cod){
	var pessoas = JSON.parse(localStorage.getItem('value'));

	for(var i = 0; i < pessoas.length; i++)
		if(pessoas[i].Id == cod)
			pessoas.splice(i, 1);
				
	
	localStorage.setItem('value', JSON.stringify(pessoas));
	listar();
	
	//Se não possuir mais nenhum registro, limpar o storage
	if(pessoas.length == 0)
		window.localStorage.removeItem("value");
}

function listar(){
	//Se não possuir nenhum local storage, nao fazer nada
	if(localStorage.getItem('value') === null)
		return;
	
	//Captura os objetos de volta
	var pessoas = JSON.parse(localStorage.getItem('value'));
	var tbody = document.getElementById("tbodyResultados");

	//limpar o body toda vez que atualizar
	tbody.innerHTML = '';
	
	for(var i = 0; i < pessoas.length; i++){
		var	id = pessoas[i].Id,
		    nome = pessoas[i].Nome,
			raz = pessoas[i].Razao,
			tipo = pessoas[i].Tipo,
			cep = pessoas[i].Cep,
			end = pessoas[i].End,
			num = pessoas[i].Num,
			bairro = pessoas[i].Bairro,
			cidade = pessoas[i].Cidade,
			estado = pessoas[i].Estado,
			email = pessoas[i].Email
			       
		tbody.innerHTML += '<tr id="rowTable'+i+'">'+
								'<td>'+nome+'</td>'+
								'<td>'+raz+'</td>'+
								'<td>'+tipo+'</td>'+
								'<td>'+cep+'</td>'+
								'<td>'+end+'</td>'+
								'<td>'+num+'</td>'+
								'<td>'+bairro+'</td>'+
								'<td>'+cidade+'</td>'+
								'<td>'+estado+'</td>'+
								'<td>'+email+'</td>'+
								'<td><button class="btn waves-effect waves-light amber accent-3" onclick="excluir(\'' + id + '\')">Excluir</button></td>'+
								'<td><button class="btn waves-effect waves-light amber accent-3" onclick="prepararAlterar(\'' + id + '\')">Alterar</button></td>'+
						   '</tr>';		
	}
}
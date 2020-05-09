window.onload = async function() {

    /* cálculo de dias */
    const formDatas = document.getElementById('formDatas');
    let dataDe = new Date(document.getElementById('data_de').value);
    let dataAte = new Date(document.getElementById('data_ate').value);

    formDatas.addEventListener('submit', function(e) {
        e.preventDefault();

    });

    let diferenca = Math.abs(dataAte.getTime() - dataDe.getTime());
    let dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).


    /* consumo da API */
    const response = await fetch("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72");
    const quartos = await response.json();
    
    let lista = quartos.map(quarto => `
        <div class="quarto col-12 col-sm-6 col-md-4 col-lg-3">
            <img class="foto img-fluid rounded" src="${quarto.photo}" />
            <div class="tipo">${quarto.property_type}</div>
            <div class="nome_quarto">${quarto.name}</div>
            <div class="preco_por_noite"><strong>R$ ${quarto.price}</strong>/noite</div>        
            <div class="preco_total">Total de R$ ${quarto.price * dias} (${dias} noites)</div>        
        </div>
    `);

    let listaFinal = lista.toString().replace(/\,/g,"");

    document.getElementById("quartos").innerHTML = listaFinal;
    document.getElementById("total_quartos").innerHTML = lista.length;
    
 

}
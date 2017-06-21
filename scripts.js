
$(function(){

    

    var listavisitados;
    $('.close_button').click(function(){
        var close = $(this).attr("data-close");
        $('#'+close).fadeOut();
    })
    $('.pau').click(function(){
        listavisitados = [];
        $('.square').removeClass('caminho');
        $('.square').removeClass('semi-caminho');
        var i = 0;
        var j = 0;
        var h = 0;
        var ifinal = $('.fim').attr("data-i");
        var jfinal = $('.fim').attr("data-j");
        var inicial = $('.inicio').attr("data-i");
        var jnicial = $('.inicio').attr("data-j");
        var deltaX = 0;
        var deltaY = 0;
        var result;
        while(i < 15){
            while(j < 15){
                deltaX = (i - ifinal)*(i - ifinal);
                deltaY = (j - jfinal)*(j - jfinal);
                h = Math.sqrt(deltaX + deltaY);
                $('.square-'+i+'-'+j).attr("data-h",h);
                j++;
            }
            j = 0;
            i++;
        }
        // var filhos = filhos(ifinal,jfinal);
        // console.log(filhos(ifinal,jfinal));
        // console.log(melhor_filho(filhos(inicial,jnicial)));
        var result = a_estrela(inicial,jnicial,ifinal,jfinal);
        console.log(result);

    })

//////////////
//////////////
//algoritmos//
//////////////
//////////////

    function node(x,y)
    {
        this.coordx = x;
        this.coordy = y;
        this.gValor = 0;
        this.hValor = 0;
        this.pai = null;
        this.filhos = [];
    }

    node.prototype.set_filhos = function(listaFilhos) {
        for(var it = 0; it < listaFilhos.length; it++)
            {
                this.filhos[it] = listaFilhos[it];
            }
    };

    node.prototype.setG = function(gn) {
        this.gValor = gn;
    };

    node.prototype.setH = function(hn) {
        this.hValor = hn;
    };

    node.prototype.setPai = function(nodePai) {
        this.pai = nodePai;
    };

    node.prototype.getPai = function() {
        return this.pai;
    };

    node.prototype.getG = function() {
        return this.gValor;
    };

    node.prototype.calcula_h = function() {
        return (this.gValor + this.hValor);
    };

    node.prototype.nodeIsEqual = function(nodeToBeCompared) {
         if(this.coordx == nodeToBeCompared.coordx && this.coordy == nodeToBeCompared.coordy)
            return true;

        return false;
    };


    function acharMelhorNode(lista)
    {
        var node = lista[0];

        for(var it = 0; it < lista.length; it++)
            {
                if(lista[it].calcula_h() < node.calcula_h())
                {
                    node = lista[it];
                }
            }
        return node;
    }

    function filhos(pai)
    {
        var filhos = [
            new node(parseInt(pai.coordx) - parseInt(1), parseInt(pai.coordy) - parseInt(1)),
            new node(parseInt(pai.coordx) - parseInt(1), parseInt(pai.coordy) - parseInt(0)),
            new node(parseInt(pai.coordx) - parseInt(1), parseInt(pai.coordy) + parseInt(1)),
            new node(parseInt(pai.coordx) - parseInt(0), parseInt(pai.coordy) - parseInt(1)),
            new node(parseInt(pai.coordx) - parseInt(0), parseInt(pai.coordy) + parseInt(1)),
            new node(parseInt(pai.coordx) + parseInt(1), parseInt(pai.coordy) - parseInt(1)),
            new node(parseInt(pai.coordx) + parseInt(1), parseInt(pai.coordy) - parseInt(0)),
            new node(parseInt(pai.coordx) + parseInt(1), parseInt(pai.coordy) + parseInt(1)) 
        ];

        // console.log(filhos);
        for (var i = 0; i < filhos.length; i++) {
            // console.log(filhos[i][0]);
            if(filhos[i].coordx > 14 || filhos[i].coordx < 0 || filhos[i].coordy > 14 || filhos[i].coordy < 0){
                // console.log(filhos.pop(i));
                //console.log(filhos[i]);
                filhos.pop(i);
            }
        }
        //console.log(filhos);
        return filhos;
    }

    function distancia_entre_nodes(nodeIni,nodeFim)
    {
        var coordx;
        var coordy;
        coordx = nodeIni.coordx - nodeFim.coordx;
        coordy = nodeIni.coordy - nodeFim.coordy;
        coordx = coordx * coordx;
        coordy = coordy * coordy;
        return Math.sqrt(coordx + coordy);
    }

    function contem_no_na_lista(node,lista,tipoLista)
    {
        
        for(var it = 0; it < lista.length; it++)
            {
                if(node.nodeIsEqual(lista[it]))
                    if(tipoLista == 'c')
                        return true; 
                    if(lista[it][2] < node.calcula_h)
                        return true;
            }
        return false;
    }

    function reconstruir_caminho(node)
    {
        var path = [];
        var node_cp = node;

        while(node_cp !== null)
        {
            path.push(node_cp);
            node_cp = node_cp.getPai();
        }
        return path;
    }

    function a_estrela(iI,jI,iF,jF){

        var q = new node(iI, jI);
        var node_final = new node(iF, jF);
        var path = [];
        var index;
        var sucessores;
        var condA;
        var condB;

        //starta a closed list
        var closedList = [];

        //starta a open list com o nó inicial
        var openList = [q];

        //enquanto a open list não está vazia
        while(openList.length != 0)
        {    

            q = openList[0];
            

            //achar o nó com menor "f"
            q = acharMelhorNode(openList);

            //removê-lo da lista
            index = openList.indexOf(q);
            openList.splice(index,1);

            //ppegar os filhos de q
            sucessores = filhos(q);

            for(var it = 0; it < sucessores.length; it++)
            {
                sucessores[it].setPai(q);
                
                if(q.nodeIsEqual(node_final))           //condição de parada
                {
                    //nós visitados na closedList
                    path = reconstruir_caminho(q);
                    return path;
                }

                //h(n)
                sucessores[it].setH(distancia_entre_nodes(sucessores[it],node_final));

                //g(n)
                sucessores[it].setG(distancia_entre_nodes(sucessores[it],node_final));

                //condições para evitar repetições na lista // loops ida e volta
                condA = contem_no_na_lista(sucessores[it],openList,'o');

                condB = contem_no_na_lista(sucessores[it],closedList,'c');

                if(!condA && !condB)
                {
                    openList.push(sucessores[it]);
                }
            }

            closedList.push(q);

        }
        return path;
    }

    function greedySearch(iI,jI,iF,jF){

        var q = new node(iI, jI);
        var node_final = new node(iF, jF);
        var path = [];
        var index;
        var sucessores;
        var condA;
        var condB;

        //starta a closed list
        var closedList = [];

        //starta a open list com o nó inicial
        var openList = [q];

        //enquanto a open list não está vazia
        while(openList.length != 0)
        {    

            q = openList[0];
            

            //achar o nó com menor "f"
            q = acharMelhorNode(openList);

            //removê-lo da lista
            index = openList.indexOf(q);
            openList.splice(index,1);

            //ppegar os filhos de q
            sucessores = filhos(q);

            for(var it = 0; it < sucessores.length; it++)
            {
                sucessores[it].setPai(q);
                
                if(q.nodeIsEqual(node_final))           //condição de parada
                {
                    //nós visitados na closedList
                    path = reconstruir_caminho(q);
                    return path;
                }

                //h(n)
                sucessores[it].setH(distancia_entre_nodes(sucessores[it],node_final));

                //condições para evitar repetições na lista // loops ida e volta
                condA = contem_no_na_lista(sucessores[it],openList,'o');

                condB = contem_no_na_lista(sucessores[it],closedList,'c');

                if(!condA && !condB)
                {
                    openList.push(sucessores[it]);
                }
            }

            closedList.push(q);

        }
        return path;
    }

    function custo_uniforme(iI,jI,iF,jF){

        var q = new node(iI, jI);
        var node_final = new node(iF, jF);
        var path = [];
        var index;
        var sucessores;
        var condA;
        var condB;

        //starta a closed list
        var closedList = [];

        //starta a open list com o nó inicial
        var openList = [q];

        //enquanto a open list não está vazia
        while(openList.length != 0)
        {    

            q = openList[0];
            

            //achar o nó com menor "f"
            q = acharMelhorNode(openList);

            //removê-lo da lista
            index = openList.indexOf(q);
            openList.splice(index,1);

            //ppegar os filhos de q
            sucessores = filhos(q);

            for(var it = 0; it < sucessores.length; it++)
            {
                sucessores[it].setPai(q);
                
                if(q.nodeIsEqual(node_final))           //condição de parada
                {
                    //nós visitados na closedList
                    path = reconstruir_caminho(q);
                    return path;
                }

                //g(n)
                sucessores[it].setG(sucessores[it].getG() + distancia_entre_nodes(sucessores[it],node_final));

                //condições para evitar repetições na lista // loops ida e volta
                condA = contem_no_na_lista(sucessores[it],openList,'o');

                condB = contem_no_na_lista(sucessores[it],closedList,'c');

                if(!condA && !condB)
                {
                    openList.push(sucessores[it]);
                }
            }

            closedList.push(q);

        }
        return path;
    }


    function visitados(ij){
        var visitado = false;
        var tam = listavisitados.length;
        for(var n = 0; n < tam; n++){
            if(ij[0] == listavisitados[n][0] && ij[1] == listavisitados[n][1]){
                visitado = true;
                // console.log(visitado);
            }
        }
        if(!visitado)
            listavisitados = listavisitados.concat([ij]);
        return visitado;
    }   

/*
    function filhos(i,j){
        var filhos = [
            [parseInt(i) - parseInt(1), parseInt(j) - parseInt(1)],
            [parseInt(i) - parseInt(1), parseInt(j) - parseInt(0)],
            [parseInt(i) - parseInt(1), parseInt(j) + parseInt(1)],
            [parseInt(i) - parseInt(0), parseInt(j) - parseInt(1)],
            [parseInt(i) - parseInt(0), parseInt(j) + parseInt(1)],
            [parseInt(i) + parseInt(1), parseInt(j) - parseInt(1)],
            [parseInt(i) + parseInt(1), parseInt(j) - parseInt(0)],
            [parseInt(i) + parseInt(1), parseInt(j) + parseInt(1)] 
        ];

        // console.log(filhos);
        for (var i = 0; i < filhos.length; i++) {
        	// console.log(filhos[i][0]);
            if(filhos[i][0] > 14 || filhos[i][0] < 0 || filhos[i][1] > 14 || filhos[i][1] < 0){
                // console.log(filhos.pop(i));
                console.log(filhos[i]);
                filhos.pop(i);
            }
        }
        console.log(filhos);
        return filhos;
    }
*/
    function melhor_filho(filhos){
        var tam = filhos.length;
        var f;
        var m = 900;
        var nM = 0;
        for(var n = 0; n < tam; n++){
            x = filhos[n];
            i = x[0];
            j = x[1];
            ij = [i,j];
            f = parseFloat($('.square-'+i+'-'+j).attr("data-h")) + parseInt($('.square-'+i+'-'+j).attr("data-g"));
            $('.square-'+i+'-'+j).addClass('semi-caminho');
            if (f < m && !visitados(ij)){
                m = f;
                nM = [i,j];
            }
        }
        // console.log(nM);
        // console.log(listavisitados);

        var result = [nM,m];
        $('.square-'+nM[0]+'-'+nM[1]).addClass('caminho');
        return result;
    }

    $('.square').click(function(){
        var i = $(this).attr("data-i");
        var j = $(this).attr("data-j");
        var a = $(this).attr("data-action"); 
        // alert("Posição: ("+i+","+j+")\nAção: "+a);
        switch(a){
            case 'parede': 
                if($(this).hasClass('parede')){
                    $(this).removeClass('parede');
                }
                else if($(this).hasClass('inicio') || $(this).hasClass('fim')){
                    $('.trigger').fadeIn();
                }
                else{
                    $(this).addClass('parede');
                    $(this).attr("data-g",1000);
                }
                break;

            case 'inicio': 
                if($(this).hasClass('inicio')){
                    $(this).removeClass('inicio');
                }
                else if($(this).hasClass('parede') || $(this).hasClass('fim')){
                    $('.trigger').fadeIn();
                }
                else{
                    $('.square').removeClass('inicio');
                    $(this).addClass('inicio');
                }
                break;

            case 'fim': 
                if($(this).hasClass('fim')){
                    $(this).removeClass('fim');
                }
                else if($(this).hasClass('parede') || $(this).hasClass('inicio')){
                    $('.trigger').fadeIn();
                }
                else{
                    $('.square').removeClass('fim');
                    $(this).addClass('fim');
                }
                break;
                break;

            case 'run': 
              
                break;
        }
    })

    $('.action').click(function(){
        var action = $(this).attr("data-acao");
        $('.square').attr("data-action", action);
    })

    $('')

    $('.trigger').click(function(){
        $(this).fadeOut();
    })
    
    $('.run').click(function(){
        alert   
        $('.square').attr("data-h",5);
    })


})
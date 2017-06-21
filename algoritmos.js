$(function(){
    $('.configbutton').click(function(){
        $('.configbutton').removeClass('active');
        $(this).addClass('active');
    })
    $('.configheader').click(function(){
        $('.configactions').slideToggle();
    })
    $('.novo-jogo').click(function(){
        limpa();
    })
    $('.close_button').click(function(){
        var close = $(this).attr("data-close");
        $('#'+close).fadeOut();
    })

    var arvore_corrente = null;
    var jogadas_ja_feitas = [];

//calcula as jogadas, imprime na tela. Só é ativada no clique.
    function joga(){
        var coords;
        var arvore_nova;
        var tam;
        var jogadaBot;
        //r = acabou();
        if (jogadas_ja_feitas.length > 0) 
        {
            coords = retornar_coords_da_matriz('x',0,0,jogadas_ja_feitas);
        }
        else
        {
            coords = retornar_coords_da_matriz('x',0,0);
        }
        jogadas_ja_feitas.push(coords);
        if (arvore_corrente == null) 
        {
            arvore_corrente = criar_arvore(10,coords[0],coords[1]);
            arvore_nova = arvore_corrente;
        }
        else
        {
            arvore_nova = busca_jogada(arvore_corrente,get_game_da_matriz());
        }
        
        var jogadaBot = minimax(arvore_nova,arvore_nova.get_altura(),true);
        imprimirMatriz(jogadaBot.jogo);
        arvore_corrente = arvore_nova;
        var tam = calcula_tamanho(arvore); 
        //r = acabou();  
    }
    
    function imprimirMatriz(jogo){
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                if(jogo[i][j] == 'x'){
                    $('.square-'+i+'-'+j).addClass('x');
                }else if (jogo[i][j] == 'o') {
                    $('.square-'+i+'-'+j).addClass('o');
                }
            }
        }
    }
/*
    function acabou(){
        var vazio = 0;
        var x;
        var o;
        for(var i = 0; i < 3; i++){
            //procura resultado em linha
            x = 0;
            o = 0;
            for(var j = 0; j < 3; j++){
                if($('.square-'+i+'-'+j).hasClass('o')){
                    o++;
                }else if($('.square-'+i+'-'+j).hasClass('x')){
                    x++;
                }else{
                    vazio++;
                }
            }
            if(x == 3){
                return 1;
            }else if(o == 3){
                return 2;
            }

            //procura resultado em coluna
            x = 0;
            o = 0;
            for(var k = 0; k < 3; k++){
                if($('.square-'+k+'-'+i).hasClass('o')){
                    o++;
                }else if($('.square-'+k+'-'+i).hasClass('x')){
                    x++;
                }else{
                    vazio++;
                } 
                if(x == 3){
                    return 1;
                }else if(o == 3){
                    return 2;
                }
            }


        }
        //procura resultado em diagonal
        if($('.square-'+1+'-'+1).hasClass('o'))
        {
            if( ($('.square-'+2+'-'+2).hasClass('o')) && ($('.square-'+0+'-'+0).hasClass('o')))
                return 2;
            else if (($('.square-'+2+'-'+0).hasClass('o')) && ($('.square-'+0+'-'+2).hasClass('o')))
                return 2;
        }

         if($('.square-'+1+'-'+1).hasClass('x'))
        {
            if( ($('.square-'+2+'-'+2).hasClass('x')) && ($('.square-'+0+'-'+0).hasClass('x')))
                return 1;
            else if (($('.square-'+2+'-'+0).hasClass('x')) && ($('.square-'+0+'-'+2).hasClass('x')))
                return 1;
        }

        if(!vazio){
            return 3;
        }
        return 0;
    }

*/
    function limpa(){
        $('.square').removeClass('o');
        $('.square').removeClass('x');
    }


    $('.square').click(function(){
        if($(this).hasClass('x')){
        }
        else if($(this).hasClass('o')){
        }
        else{
            $(this).addClass('x');
            setTimeout(function(){ 
                joga();
            }, 100);
        }
    })

    //recebe o tamanho da árvore e as coords para o nó inicial e a cria
    function criar_arvore(h, x, y)
    {
        var altura = h;
        if (altura > 8) {altura = 8;}
        var no_ini = new node (x,y,'x');
        no_ini.set_peso(no_ini.calcula_peso());
        while(no_ini.get_altura() != altura)
        {
            no_ini = funcao_sucessor(no_ini,'x');
        }
        return no_ini;
    }

    //criar matrizes
    function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
    }

    //classe nó, elemento da árvore.
    function node(x,y,elem,jogo_corrente)
    {
        this.pai = null;
        this.filhos = [];
        if (arguments.length > 1)
        {
            this.coordx = x;
            this.coordy = y;
        }
        this.jogo = createArray(3,3);
        if(arguments.length == 4)
        {
            for (var i = 0; i < this.jogo.length; i++) {
                    for (var j = 0; j < this.jogo[i].length; j++) {
                        this.jogo[i][j] = jogo_corrente[i][j];
                    }
                }
            this.jogo[x][y] = elem;
        }
        else if(arguments.length == 3)
        {
            if (this.jogo[0][0] != null || jogo_corrente == null) 
            {
                for (var i = 0; i < this.jogo.length; i++) {
                    for (var j = 0; j < this.jogo[i].length; j++) {
                        this.jogo[i][j] = 'n';
                    }
                }
            }
            else
            {
                this.jogo = jogo_corrente;
            }
        this.jogo[x][y] = elem;
        }
        this.altura = 0;
        if (arguments.length == 1) 
        {
            if(x == '-')
                this.peso = -9999;
            else if(x == '+')
                this.peso = +9999;
        }
        else
            this.peso = null;
    }

    //getters:
    node.prototype.getjogo = function() {
        return this.jogo;
    };

    node.prototype.getElem = function() {
        return this.jogo[this.coordx][this.coordy];
    };

    node.prototype.getPeso = function() {
        if (this.peso == null) {return 0;}
        else return this.peso;
    };

    node.prototype.get_altura = function() {
        return this.altura;
    };

    //setters:
    node.prototype.setInJogo = function(x,y,e) {
        this.jogo[x][y] = e;
    };

    node.prototype.set_filho = function(filho) {
        this.filhos.push(filho);
    };

    node.prototype.set_peso = function(valor) {
        this.peso = valor;
    };

    node.prototype.set_oponente = function() {
        if (this.getElem() == 'n') {return null;}
        else if (this.getElem() == 'x') {return 'o';}
            else return 'x';
    };

    node.prototype.set_pai = function(no) {
        this.pai = no;
        //set_altura(this, 0);
    };

    node.prototype.set_altura = function(valor) {
        this.altura = valor;
    };

    //métodos:
    node.prototype.isTerminal = function() {
        if(this.peso == 0 || this.peso == 3)
            return true;
        return false;
    };
 
/*  IMPLEMENTAÇÃO PARA PEGAR DA MATRIZ WEB
    node.prototype.isEmpty = function() {
        if (($('.square-'+this.coordx+'-'+this.coordy).hasClass('o')) || ($('.square-'+this.coordx+'-'+this.coordy).hasClass('x')))
            return false;
        return true;
    };

    node.prototype.isX = function() {
        if ($('.square-'+this.coordx+'-'+this.coordy).hasClass('x'))
            return true;
        return false;
    };

    node.prototype.isO = function() {
        if ($('.square-'+this.coordx+'-'+this.coordy).hasClass('o'))
            return true;
        return false;
    };
*/
    node.prototype.isEmpty = function() {
        for (var i = 0; i < this.jogo.length; i++) {
            for (var j = 0; j < this.jogo[i].length; j++) {
                if(this.jogo[i][j] != 'n')
                {
                    return false;
                }
            }
        }
        return true;
    };

    node.prototype.isX = function() {
        if(this.getElem() == 'x')
            return true;
        return false;
    };

    node.prototype.isO = function() {
        if(this.getElem() == 'o')
            return true;
        return false;
    };

    node.prototype.spaceIsEmpty = function() {
        if(this.getElem() == 'n')
            return true;
        return false;
    };

    node.prototype.num_adjacentes = function() {
        if (this.coordx == 1) 
        {
            if (this.coordy == this.coordx) {return 8;}
            else return 5;
        }
        if (this.coordx == this.coordy) {return 3;}
        else if (this.coordx == 0) 
            {
                if (this.coordy == 2) {return 3;}
                else return 5;
            }
            else
            {
                if (this.coordy == 0) {return 3;}
                else return 5;
            }
    };
    
    //as 4 funções abaixo calculam o peso do nó se 
    //o jogo tem resultado definido.
    //se é positivo ou negativo depende se é 'x' ou 'o' ('x' para positivo, 'o' para negativo)
    //retornam -1 se for uma jogada de derrota (Apenas no que tem o tratamento de pior jogada)
    //retornam 1 se for uma jogada inicial 
    //retornam 2 se for uma jogada perto da vitoria
    //retornam 3 se for uma jogada terminal
    //retornam 0 se for uma jogada de empate.
    //retornam null se o nó estiver vago.

    //x == jogador; o == bot


    //COM tratamento de pior jogada
    /*
    node.prototype.calcula_peso = function() {
        if(this.spaceIsEmpty())
        {
            return null;
        }
        var oponente = this.set_oponente(); 
        var adj;
        adj = this.num_adjacentes();
        var peso_candidato;
        var peso_oponente;
        if (this.pai == null) {peso_oponente = 0;}
        else 
        {
            peso_oponente = this.pai.getPeso();
        }
        if (adj == 3) 
        {
            peso_candidato = this.d_calcula_peso(this.getElem());
        } 
        else if (adj == 5) 
            {
                peso_candidato = this.pm_calcula_peso(this.getElem());
            }
            else 
                {
                    peso_candidato = this.m_calcula_peso(this.getElem());
                }
        if (peso_candidato == 0 || peso_candidato == 3) {return peso_candidato;}
        if (peso_oponente == -1) 
            {
                return -1;
            }
        if (peso_oponente == 2) 
        {
            if (peso_oponente >= peso_candidato)
             {
                return -1;
             }
        }
        else return peso_candidato;
    };
    */

    //SEM tratamento de pior jogada
    node.prototype.calcula_peso = function() {
        if(this.spaceIsEmpty())
        {
            return null;
        } 
        var adj;
        adj = this.num_adjacentes();
        var peso;
        if (adj == 3) 
        {
            peso = this.d_calcula_peso(this.getElem());
        } 
        else if (adj == 5) 
            {
                peso = this.pm_calcula_peso(this.getElem());
            }
            else 
                {
                    peso = this.m_calcula_peso(this.getElem());
                }
        
        return peso;
    };

    node.prototype.d_calcula_peso = function(jogador) {
        var aux;
        var nodes_adj;
        var valCandidato;

        nodes_adj = get_adj_nodes(this,'h');
        valCandidato = avalia_trio(jogador,nodes_adj[0],nodes_adj[1]);
        nodes_adj = get_adj_nodes(this,'v');
        aux = avalia_trio(jogador,nodes_adj[0],nodes_adj[1]);
        if (valCandidato < aux)
            valCandidato = aux;

        if (this.coordx == this.coordy)
        {
            nodes_adj = get_adj_nodes(this,'d1');
            aux = avalia_trio(jogador,nodes_adj[0],nodes_adj[1]);
            if (valCandidato < aux)
                valCandidato = aux;
        }
        else
        {
            nodes_adj = get_adj_nodes(this,'d2');
            aux = avalia_trio(jogador,nodes_adj[0],nodes_adj[1]);
            if (valCandidato < aux)
                valCandidato = aux;
        
        }
        return valCandidato;
    };

    node.prototype.m_calcula_peso = function(jogador) {
        var aux;
        var nodes_adj;
        var valCandidato;

        nodes_adj = get_adj_nodes(this,'h');
        valCandidato = avalia_trio(jogador,nodes_adj[0],nodes_adj[1]);
        nodes_adj = get_adj_nodes(this,'v');
        aux = avalia_trio(jogador,nodes_adj[0],nodes_adj[1]);
        if (valCandidato < aux)
            valCandidato = aux;

        nodes_adj = get_adj_nodes(this,'d1');
        aux = avalia_trio(jogador,nodes_adj[0],nodes_adj[1]);
        if (valCandidato < aux)
            valCandidato = aux;

        nodes_adj = get_adj_nodes(this,'d2');
        aux = avalia_trio(jogador,nodes_adj[0],nodes_adj[1]);
        if (valCandidato < aux)
             valCandidato = aux;

        return valCandidato;
    };

    node.prototype.pm_calcula_peso = function(jogador) {
        var aux;
        var nodes_adj;
        var valCandidato;

        nodes_adj = get_adj_nodes(this,'h');
        valCandidato = avalia_trio(jogador,nodes_adj[0],nodes_adj[1]);
        nodes_adj = get_adj_nodes(this,'v');
        aux = avalia_trio(jogador,nodes_adj[0],nodes_adj[1]);
        if (valCandidato < aux)
            valCandidato = aux;

        return valCandidato;
    };


    //calcula o tamanho da árvore ou subárvore
    function calcula_tamanho(node)
    {
        if (node.filhos.length == 0) {return 1;}
        else
        {
           var cont = 0; 
           for (var i = 0; i < node.filhos.length; i++) 
           {
               cont = cont + calcula_tamanho(node.filhos[i]);
           }
        }
        return cont;
    }


    //obtem 2 nós adjacentes, dependendo dos parâmetros passados
    //h == horizontal, v == vertical, d1 == diagonal decrescente, d2 == diagonal crescente
    function get_adj_nodes(no,param)
    {
        var adj_n = [];
        var i;
        var j;
        switch(param)
        {
            case 'h':
                j = no.coordy;
                j++;
                while(adj_n.length < 2)
                { 
                    if(j == 3)
                        j = 0;
                    adj_n.push(no.jogo[no.coordx][j]);
                    j++;     
                }
            break;
            case 'v':
                i = no.coordx;
                i++;
                while(adj_n.length < 2)
                { 
                    if(i == 3)
                        i = 0;
                    adj_n.push(no.jogo[i][no.coordy]);
                    i++;     
                }
            break;
            case 'd1':
                i = no.coordx;
                i++;
                j = no.coordy;
                j++;
                while(adj_n.length < 2)
                {
                    if(i == 3)
                        i = 0;
                    if(j == 3)
                        j = 0;
                    adj_n.push(no.jogo[i][j]);
                    i++;
                    j++;  
                }
            break;
            case 'd2':
                i = no.coordx;
                i--;
                j = no.coordy;
                j++;
                while(adj_n.length < 2)
                {
                    if(i == -1)
                        i = 2;
                    if(j == 3)
                        j = 0;
                    adj_n.push(no.jogo[i][j]);
                    i--;
                    j++;  
                }
            break;
        }
        return adj_n;
    }

    //avalia o conjunto de 3 jogadas previamente selecionadas pela função acima
    function avalia_trio(no1, no2, no3)
    {
        if ((no1 == 'n' && no2 == 'n') || (no1 == 'n' && no3 == 'n') || (no2 == 'n' && no3 == 'n')){return 1;}
        if (no1 == 'n' || no2 == 'n' || no3 == 'n')
        {
            if ( (no1 == 'x' && no2 == 'x') || (no1 == 'o' && no2 == 'o') ||
                 (no1 == 'x' && no3 == 'x') || (no1 == 'o' && no3 == 'o') ||
                 (no2 == 'x' && no3 == 'x') || (no2 == 'o' && no3 == 'o') )
                return 2;
        }

        if((no1 == 'x' && no2 == 'x' && no3 == 'x') || (no1 == 'o' && no2 == 'o' && no3 == 'o'))
            return 3;

        return 0;

    }

/*
    function tem_elemento_na_coordenada(x,y)
    {
        if (($('.square-'+x+'-'+y).hasClass('x')) || ($('.square-'+x+'-'+y).hasClass('o'))) 
            return true;
        return false; 
    }
*/ 
    //função que busca na matriz WEB o elemento ('x' ou 'o')
    function retornar_coords_da_matriz(elem_de_busca,i_inicial,j_inicial,coords_a_ignorar)
    {
        for (var i = i_inicial; i < 3; i++) 
        {
            for (var j = j_inicial; j < 3; j++) {
                if (arguments.length == 4) 
                {
                    for (var i = 0; i < coords_a_ignorar.length; i++) {
                        if (i == coords_a_ignorar[i][0] && j == coords_a_ignorar[i][1]) {continue;}
                    }  
                }
                if(($('.square-'+i+'-'+j).hasClass(elem_de_busca)))
                {
                    var coords = [i,j];
                    return coords;
                }
            }
        }
        return false;
    }

    //gera os filhos da nó
    function set_filhos(no,e) {
        var filho;
        no.set_altura(no.altura + 1);
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                if (no.coordx == i && no.coordy == j) {continue;}
                if (no.jogo[i][j] == 'o' || no.jogo[i][j] == 'x'){continue;}
                else
                {
                    filho = new node(i,j,e,no.getjogo());
                    filho.set_pai(no);
                    filho.set_peso(filho.calcula_peso());
                    filho.set_altura(filho.pai.get_altura() - 1);
                    no.set_filho(filho);
                }
            }
        } 
        return no;
    }

    //função sucessora do jogo: é o que cria as jogadas e as possibilidades
    function funcao_sucessor(no, elem)
    {
        if (no.altura == 0) 
        {
            //var coord_inicial = retornar_coords_da_matriz('x',0,0);
            //var no_inicial = new node(coord_inicial[0],coord_inicial[1],'x');
            if (no.spaceIsEmpty()) 
            {
                if (elem == 'x') 
                {
                    var no_folha = new node(no.coordx,no.coordy,'x',no.getjogo());
                    set_filhos(no_folha,'o');
                }
                else if (elem == 'o') 
                {
                    var no_folha = new node(no.coordx,no.coordy,'o',no.getjogo());
                    set_filhos(no_folha,'x'); 
                }
            }
            else
            {
                if (no.getElem() == 'x')
                    set_filhos(no,'o');
                else
                    set_filhos(no,'x');
                var no_folha = no;
            }
            return no_folha;
        }
        else
        {
            for (var i = 0; i < no.filhos.length; i++) {
                no.filhos[i] = funcao_sucessor(no.filhos[i],no.filhos[i].getElem());
            }
            no.set_altura(no.filhos[0].get_altura() + 1);
            return no;
        }
    }

    //busca, dentro do conjunto de jogos da árvore, o jogo desejado 
    function busca_jogada(nos,jogo_procurado)
    {
        if (jogos_sao_iguais(nos.jogo,jogo_procurado)) {return nos;}
        else{
            var jogada = false;
            for (var i = 0; i < nos.filhos.length; i++) {
               jogada = busca_jogada(nos.filhos[i],jogo_procurado);
            }
        }
        return jogada;
    }

    //comparação entre os jogos
    function jogos_sao_iguais(jogo1, jogo2)
    {
       var cont = 0;
        for (var i = 0; i < 3; i++) 
        {
            for (var j = 0; j < 3; j++) {
                if(jogo1[i][j] == jogo2[i][j])
                    cont++;
            }
        }
        if (cont == 9) {return true;}
        else {return false;}
    }

    //converte o jogo na matriz WEB para uma matriz [3][3]
    function get_game_da_matriz()
    {
        var comp = createArray(3,3);
        for (var i = 0; i < 3; i++) 
        {
            for (var j = 0; j < 3; j++) 
            {
                if (($('.square-'+i+'-'+j).hasClass('x'))) {comp[i][j] = 'x';}
                else if (($('.square-'+i+'-'+j).hasClass('o'))) {comp[i][j] = 'o';}
                else {comp[i][j] = 'n';}
            }
        }
        return comp;
    }

    //funções de min e max do minimax
    function min(a,b){if (a.getPeso()>b.getPeso()) return b; return a;}
    function max(a,b){if (a.getPeso()>b.getPeso()) return a; return b;}

    //minimax padrão
    function minimax(no, profundidade, maxPlayer)
    {
        if (profundidade == 0 || no.isTerminal()) //passível de alteração
        {
            return no;
        }
        if (maxPlayer) 
        {
            var melhorValor = new node('-')
            for (var i = 0; i < no.filhos.length; i++) {
                var melhorNode = minimax(no.filhos[i],profundidade - 1,false)
                melhorValor = max(melhorValor,melhorNode);

            }

            return melhorValor;
        }
        else
        {
            var melhorValor = new node('+')
            for (var i = 0; i < no.filhos.length; i++) {
                 var melhorNode = minimax(no.filhos[i],profundidade - 1,true)
                 melhorValor = min(melhorValor,melhorNode);
            }
            return melhorValor;
        }


    }

})
<html>
    <head>
        <title>Jogo da Velha</title>
        <meta name="charset" content="utf-8">
         <link href="https://fonts.googleapis.com/css?family=Ubuntu:100,300,400,500,700" rel="stylesheet"> 
         <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="algoritmos.js"></script>
    </head>
    <body>
        <div class="overlay" style='display: none'></div>
        <div class="trigger" style="display: none;">
            <div class="triggerclose"><i class="fa fa-close"></i></div>
            <div class="jwc_return"></div>
        </div>
        <header id="main_header">
            <div class="content">
                <h1>Jogo da Velha</h1>
            </div>
        </header>
        <main>
            <section id="botao" align='center'>
                <button class='resetbutton' style='display: none'>Jogar Novamente</button>
            </section>
            <section id='map'>
                    <?php 
                    
                    for($i = 0; $i < 3; $i++){
                        for($j = 0; $j < 3; $j++){
                            echo "<div class='square square-{$i}-{$j}' data-i='{$i}' data-j='{$j}'></div>";
                        }   
                    }
                    
                    ?>
            </section>
            <section id="results" align="center">
                <button class='limpartabela' style='display: none'><i class="fa fa-trash"></i> Limpar Tabela</button>
                <table class='tabela'>
                    <tr>
                        <th></th>
                        <th>Minimax</th>
                        <th>Alpha-beta</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Nós expandidos</th>
                        <th>Nós expandidos</th>
                    </tr>
                </table>
            </section>
        </main>
    </body>
</html>
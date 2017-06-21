<html>
    <head>
        <title>Jogo da Velha</title>
        <meta name="charset" content="utf-8">
         <link href="https://fonts.googleapis.com/css?family=Ubuntu:100,300,400,500,700" rel="stylesheet"> 
         <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"> 
        <link rel="stylesheet" href="style.css">
        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="algoritmos.js"></script>
    </head>
    <body>
        <div class="trigger" style="display: none;">
            <div class="error">
                <p><b>Opss, </b>algo de errado não está certo. O bloco que você clicou não está vazio!</p>
            </div>
        </div>
        <header id="main_header">
            <div class="content">
                <h1>Jogo da Velha</h1>
            </div>
        </header>
        <main>
            <article id='instruction_box' style='display: none'>
                <div id="instructions-header" align="right">
                    <button class=' btn btn_red close_button' data-close="instruction_box"><i class="fa fa-close"></i></button>
                </div>
                <div id="instructions">
                    <h2>INSTRUÇÕES</h2>
                </div>
            </article>
            <section id='map'>
                    
                    <?php 
                    
                    for($i = 0; $i < 3; $i++){
                        for($j = 0; $j < 3; $j++){
                            echo "<div class='square square-{$i}-{$j}' data-i='{$i}' data-j='{$j}'></div>";
                        }   
                    }
                    
                    ?>

                
            </section>
        </main>
        <div class="config">
            <div class="configheader">
               <h3>Modos de Jogo</h3> 
            </div>
            <div class="configactions" style='display: none'>
                <button class='configbutton active mini-max'>Mini Max</button>
                <button class='configbutton alfa-beta'>Alfa Beta</button>
                <button class='resetbutton'>Jogar Novamente</button>
            </div>
        </div>
        <div class="results">
            <div class="resultsheader">
               <h3>Resultados</h3> 
            </div>
            <div class="resultsreturn" style='display: none'>
                <button class='configbutton active mini-max'>Mini Max</button>
                <button class='configbutton alfa-beta'>Alfa Beta</button>
                <button class='resetbutton'>Jogar Novamente</button>
            </div>
        </div>
    </body>
</html>
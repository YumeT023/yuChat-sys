<?php 
    require __DIR__ . '/vendor/autoload.php';
    

    $options = array(
        'cluster' => 'ap2',
        'useTLS' => true
    );
    
    // Make connection
    $pusher = new Pusher\Pusher(
        'c041ae0a438504593a91',
        '04775ccf064b1c63f178',
        '1367914',
        $options
    );
    
    
    
    // Check the received message
    if(isset($_POST['message']) AND isset($_POST['name'])) {

        $_POST['name'] == 'YumeT023' ? $side = 'R' : $side = '';  
        /**
         * Data shouldn't contains any special tag that would be dangerous such as '<' and '>' that may trigger a script
         * e.g: <script>alert('dangerous script')</script>, <?php include('...'); ?>
         */
        
        $data = '<div class="msgComponent ' . $side . '">
                    <header>' . htmlspecialchars($_POST['name']) . '</header>
                    <main>' . htmlspecialchars($_POST['message']) . '</main>
                </div>';
        

    
        // trigger the pusher's event & return the structured data
        if($pusher->trigger('yuChat-channel', 'send_message_event', $data)) {
            echo 'success';
        } else {
            echo 'error';
        }
    
    }
    
?>

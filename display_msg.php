<?php 
    require __DIR__ . '/vendor/autoload.php';
    
    $options = array(
        'cluster' => 'ap2',
        'useTLS' => true
    );
    
    $pusher = new Pusher\Pusher(
        'c041ae0a438504593a91',
        '04775ccf064b1c63f178',
        '1367914',
        $options
    );
    
    
    
    // Check the receive message
    
    if(isset($_POST['message'])) {

        $_POST['name'] == 'YumeT023' ? $side = 'R' : $side = '';  
        $data = '<div class="msgComponent ' . $side . '">
                    <header>' . htmlspecialchars($_POST['name']) . '</header>
                    <main>' . htmlspecialchars($_POST['message']) . '</main>
                </div>';

    
        // Return the received message
        if($pusher->trigger('yuChat-channel', 'send_message_event', $data)) {
            echo 'success';
        } else {
            echo 'error';
        }
    
    }
    
?>
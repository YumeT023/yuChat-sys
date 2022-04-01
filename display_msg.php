<?php 
    require __DIR__ . '/vendor/autoload.php';
    
    $options = array(
        'cluster' => 'ap2',
        'useTLS' => true
    );
    
    $pusher = new Pusher\Pusher(
        '3fc1d0b71d2047519b0d',
        '8af11eab968c6cbee7e0',
        '1368367',
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
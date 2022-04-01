window.addEventListener('DOMContentLoaded', function(){
    // only request uses jquery/ajax
    const [name, message, btn] = document.querySelector('.container form').children;
    // get all the form's input |name|message|button(send)
    const msgCompo = document.querySelector('.container main');
    // get the message container
    let isValid = new Boolean();
    // a boolean used to validate or no the message form
    name.onkeyup = message.onkeyup = function(e) {
        // whether name/message input keyup event is triggered
        if ((/\s/g.test(name.value) || name.value == '') || message.value.replace(/\s/g, '') == '') {
        //    if (name) contains whitespace or it's blank
        // OR if (message) is just a lot of whitespace or blank
            btn.classList.remove('valid');
            // then remove button is not available and considered as normal input button
            isValid = false;
        }else {
            btn.classList.add('valid');
            // else it's available and considered as the form subsmission's button
            isValid = true;
        }
        if (e.key == 'Enter') { btn.click() }
    }
    btn.addEventListener('click', function(){
        // on click on the (send) button
        if (isValid) {
            // Send AJAX request to the PHP file on server 
            $.post('display_msg.php',
            {
                name: name.value,
                message: message.value
            }, response => {
                // callback fn

                message.value = '';
                message.focus();
                // empty message input and focus on

                msgCompo.lastChild.scrollIntoView();
                // auto scroll to the newest message
            })
        } else {
            alert(`contraint : \n\t- Name shouldn't contains whitespace\n\t- Message shouln't be just a lot of whitespace`);
        }
    })
    
    /*****************************************************
     *  pusher
     ******************************************************/

    // Add API Key & cluster here to make the connection 
    let pusher = new Pusher('c041ae0a438504593a91', {
        cluster: 'ap2',
        encrypted: true
    });

    // unique channel where users will be subscribed in
    var channel = pusher.subscribe('yuChat-channel');
    
    // bind the server event to get the response data and append it to msgCompo which is all the message's container
    channel.bind('send_message_event', function(data) {
        msgCompo.innerHTML += data;
        // paste the data from server
        msgCompo.lastChild.scrollIntoView();
        // auto scroll to the newest message
    });

    // check if the user is subscribed to the above channel
    channel.bind('pusher:subscription_succeeded', function(members) {
        console.log('successfully subscribed!');
    });
    
});

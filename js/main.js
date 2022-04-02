window.addEventListener('DOMContentLoaded', function(){
    // only Ajax request used JQuery
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
            // then the button is not available and considered as normal input button (an alert box will be triggered if button is clicked)
            isValid = false;
        }else {
            btn.classList.add('valid');
            // else it's available and considered as the form's submission button
            isValid = true;
        }
        if (e.key == 'Enter') { 
            // when any input are focused then Enter Key is considered as button click too
            btn.click();
        }
    }
    btn.addEventListener('click', function(){
        // on click on the (send) button
        if (isValid) {
            // Send AJAX POST request to the server, with the given input (name, message)
            $.post('display_msg.php',
            {
                name: name.value,
                message: message.value
            }, response => {

                message.value = '';
                message.focus();
                // empty message input and focus on

                msgCompo.lastChild.scrollIntoView();
                // auto scroll to the newest message
            })
        } else {
            alert(`contraint : \n\t- Name shouldn't contains whitespace\n\t- Message shouln't be just a lot of whitespace`);
            // alert box ... if input is not validated
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

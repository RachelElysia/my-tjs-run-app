import os
from twilio.rest import Client

@app.route('/merp', methods=['POST'])
def send_sms():
    """Send SMS."""

    # Your Account SID from twilio.com/console
    account_sid = account_sid_key
    # Your Auth Token from twilio.com/console
    auth_token  = auth_token_key

    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to=my_number, 
        from_="+15402884977",
        body="Hello from Python!")

    print(message.sid)




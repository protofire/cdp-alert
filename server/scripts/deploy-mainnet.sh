now rm cdp-alert-api -y
now --public -A now.json
now alias -A now.json
now logs cdp-alert-api.now.sh -f

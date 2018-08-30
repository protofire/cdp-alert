now rm cdp-alert-api-kovan -y
now --public -A now-kovan.json
now alias -A now-kovan.json
now logs cdp-alert-api-kovan.now.sh -f

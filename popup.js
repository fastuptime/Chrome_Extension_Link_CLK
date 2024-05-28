async function myAlert(){
    let email = document.getElementById("mail").value;
    let pass = document.getElementById("pass").value;
    await fetch(`https://linkclk.net/api_login/?email=${email}&pass=${pass}`, {
        method: 'GET',
        mode: 'cors'
    })
    .then(async (response) => {
        if (response.ok) {
        return response.text();
        }
        throw new Error('Response was not ok.');
    })
    .then(async (data) => {
        // document.getElementById('id_response').value = data;
        let obj = JSON.parse(data);
        if(obj.success) {
            localStorage.setItem("api_key", obj.api_key);
            localStorage.setItem("username", obj.username);
            let uname = localStorage.getItem("username");
            document.getElementById('hi_cna').innerHTML = '👋 Hi, '+ uname;
            document.getElementById('login_bro').style.display = "none";
            document.getElementById('nice_login').style.display = "block";
        }
        else{
            alert(obj.message);
        }
    })
    .catch(async (error) => {
        // document.getElementById('id_response').value = error;
        alert(error);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sbmt').addEventListener('click', myAlert);
    let api_key = localStorage.getItem("api_key");
    if(api_key != null) {
        let uname = localStorage.getItem("username");
        document.getElementById('hi_cna').innerHTML = '👋 Hi, '+ uname.slice(0, 14);
        document.getElementById('login_bro').style.display = "none";
        document.getElementById('nice_login').style.display = "block";
    } else {
        document.getElementById('login_bro').style.display = "block";
        document.getElementById('nice_login').style.display = "none";
    }

    document.getElementById('logout').addEventListener('click', function () {
        localStorage.removeItem("api_key");
        document.getElementById('login_bro').style.display = "block";
        document.getElementById('nice_login').style.display = "none";
    });

    document.getElementById('short_sbmt').addEventListener('click', function () {
        let url = document.getElementById('uzun_url').value;
        let api_key = localStorage.getItem("api_key");
        if(!url.includes("http")) return alert("Please enter a valid url");
        if(api_key != null) {
            fetch(`https://linkclk.net/api/?api=${api_key}&url=${url}&alias=ace&pl=2`, {
                method: 'GET',
                mode: 'cors'
            })
            .then(async (response) => {
                if (response.ok) {
                    return response.text();
                }
                alert(response.statusText);
                throw new Error('Response was not ok.');
            })
            .then(async (data) => {
                let obj = JSON.parse(data);
                if(obj.status == "success") {
                    document.getElementById('short_url').value = obj.url;
                    document.getElementById('copy_btn').style.display = "block";
                    document.getElementById('new_link').style.display = "block";
                    document.getElementById('uzun_url').style.display = "none";
                    document.getElementById('icon_uzunurl').style.display = "none";
                    document.getElementById('short_sbmt').style.display = "none";
                }
                else {
                    alert(obj.message);
                }
            })
            .catch(async (error) => {
                // document.getElementById('id_response').value = error;
                alert(error);
            });
        } else {
            localStorage.removeItem("api_key");
            document.getElementById('login_bro').style.display = "block";
            document.getElementById('nice_login').style.display = "none";
        }
    })
    function copy(text) {
        const ta = document.createElement('textarea');
        ta.style.cssText = 'opacity:0; position:fixed; width:1px; height:1px; top:0; left:0;';
        ta.value = text;
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        ta.remove();
    }

    document.getElementById("copy_btn").addEventListener("click", function() {
        var copyText = document.getElementById("short_url").value;
        copy(copyText);
        }
    );

    document.getElementById('new_link').addEventListener('click', function () {
        document.getElementById('uzun_url').style.display = "block";
        document.getElementById('icon_uzunurl').style.display = "block";
        document.getElementById('short_sbmt').style.display = "block";
        document.getElementById('short_url').value = "";
        document.getElementById('copy_btn').style.display = "none";
        document.getElementById('new_link').style.display = "none";
    });
});

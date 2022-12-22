import { Text, Link, Navbar, Spacer, Divider, Button,Input,Grid} from "@nextui-org/react";
import Router from 'next/router'

async function getauth() {
    var url=document.getElementById("web_url").value
    var username=document.getElementById("username").value
    var password=document.getElementById("password").value
    var resp=await (await fetch(url+"login?user="+username+"&password="+password)).text()
    if (resp!=="0") {
        var recv=url+"fetch_latest?token="+resp
        var send=url+"input?token="+resp+"&data="
        Router.push('/dashboard?token='+resp+"&recvaddr="+recv+"&sendaddr="+send)
    }else{
        Router.push('/')
    }
}

export default function Home() {
    return (
            <>
            <Spacer y={15} />
            <div css={{"margin":"auto"}}>
            <Grid>
                <Input 
                css={{"margin-left":"41%"}}
                underlined 
                labelLeft="username" 
                placeholder="LTZ" 
                id="username"
                />
            </Grid>
            <br /><br /><br />
            <Grid>
                <Input 
                css={{"margin-left":"41%"}}
                underlined 
                labelLeft="password" 
                placeholder="LTZ" 
                id="password"
                />
            </Grid>
            <br /><br /><br />
            <Grid>
                <Input 
                css={{"margin-left":"41%"}}
                underlined 
                labelLeft="web_url" 
                placeholder="LTZ" 
                id="web_url"
                />
            </Grid>
            <br /><br /><br />
            <Button css={{"margin-left":"44%"}} onClick={getauth}>Login</Button>
            </div>
            </>
        )
}
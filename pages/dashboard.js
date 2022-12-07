import Head from "next/head";
import { Text, Link, Navbar, Spacer, Divider, Button,Input,Grid,Card, Container} from "@nextui-org/react";
import Router from 'next/router'

async function getauth() {
    var url=document.getElementById("web_url").value
    var username=document.getElementById("username").value
    var password=document.getElementById("password").value
    var resp=await (await fetch(url+"login?user="+username+"&password="+password)).text()
    if (resp!=="0") {
        Router.push('/dashboard?token='+resp)
    }else{
        Router.push('/')
    }
}

export default function Home() {
    return (
        <>
            <Head>
                <title></title>
            </Head>
            <Navbar isBordered isCompact variant="sticky" css={{bgBlur: "#000000"}}>
                <Navbar.Brand>
                    <Text h3 css={{textGradient: "45deg, $blue600 -20%, $pink600 50%"}}>Lumatozer</Text>
                </Navbar.Brand>
                <Navbar.Content activeColor="secondary">
                <Navbar.Link isActive href="https://lumatozer.net/">Home</Navbar.Link>
                <Navbar.Link href="https://ltzdocs.vercel.app" target='_blank'>Docs</Navbar.Link>
                <Navbar.Link href="https://lumatozer.net/explorer">Explorer</Navbar.Link>
                </Navbar.Content>
            </Navbar>
        </> 
    )
}
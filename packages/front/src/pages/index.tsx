import React, { useEffect } from "react";
import Layout from "../components/layout";
import Container from "../components/layout/container";
import Router from "../components/common/routes";

const Home: React.FC = () => {
  useEffect(() => {
    const ws = new WebSocket('wss://3k5ypmnw-j4xzlquc-ud4wnix2ysoo.vcc2.mcprev.cn/socket')
    console.log(ws)
    ws.onmessage = (event) => {
      console.log(event.data)
    }
    ws.onclose = (event) => {
      console.log('close', event)
    }
  }, [])
  return (
    <Layout>
      <Container>
        <Router />
      </Container>
    </Layout>
  );
}

export default Home;
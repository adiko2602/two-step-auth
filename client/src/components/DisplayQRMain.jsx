import {
    Center,
    Flex,
    Heading,
    Text,
    Container,
    Divider,
    Button,
} from "@chakra-ui/react"

import { useLocation } from "react-router-dom";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function DisplayQRMain({ props }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [otpauth_url] = useState(location.state.otpauth_url);
    const canvasRef = useRef();

    useEffect(() => {
        QRCode.toCanvas(
            canvasRef.current,
            otpauth_url || " ",
            (error) => error && console.error(error)
        );
    }, [otpauth_url]);

    function handleRoute() {
        navigate('/login')
    }

    return <Flex
        maxW="500px"
        w="100%"
        rounded="1rem"
        p="2rem"
        direction="column"
        gap="2rem"
        border="1px"
        borderColor="gray.200"
    >
        <Heading size="md">Zeskanuj kod aplikacją authenticator</Heading>
        <Flex justifyContent="center">
            <canvas ref={canvasRef} />

        </Flex>
        <Divider />
        
        <Container ><Text as='b'>Lub wprowadź kod ręcznie</Text></Container>
        <Container >{otpauth_url}</Container>
        <Button type="button" colorScheme="green" onClick={handleRoute}>
        Przejdź do logowania
      </Button>
    </Flex>
}
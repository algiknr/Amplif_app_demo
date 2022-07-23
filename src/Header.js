import { Flex, Image, useTheme } from "@aws-amplify/ui-react";

export function Header() {
    const { tokens } = useTheme();

    return (
        <Flex justifyContent="center">
            <Image
                alt="logo"
                src="https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png"
                padding={tokens.space.medium}
            />
        </Flex>
    );
}

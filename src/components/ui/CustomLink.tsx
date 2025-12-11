import { Link, RelativePathString, ExternalPathString } from "expo-router";
import { useTheme } from "styled-components/native";
import { LinkText } from "./styles";

export function CustomLink({ text, href }: { text: string, href: RelativePathString | ExternalPathString }) {
    const theme = useTheme()
    return (
        <Link href={href} style={{ borderBottomWidth: 1, borderColor: theme.link.border, textAlign: 'center' }}>
            <LinkText style={{ letterSpacing: 2.88 }}>{text}</LinkText>
        </Link>
    )
}
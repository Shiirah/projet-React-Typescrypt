type Props = { message: string };

export function ErrorMessage({ message }: Props) {
    return (
        <p className="error" role="alert">
            {message}
        </p>
    );
}

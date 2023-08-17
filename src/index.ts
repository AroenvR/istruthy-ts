import dotenv from 'dotenv'; dotenv.config();

const foo = async (): Promise<void> => {
    console.log(`Did you know: ${process.env.SECRET_KEY}!`);
}
foo();

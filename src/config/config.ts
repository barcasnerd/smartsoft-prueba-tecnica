const config = {
    cookieParser_SECRET: process.env.JWT_SECRET || 'secret',
    admin_PASSWORD: process.env.ADMIN_PASSWORD || 'a',
    admin_EMAIL: process.env.ADMIN_EMAIL || 'a',
}

export default config;
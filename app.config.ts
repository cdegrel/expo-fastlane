import type { ConfigContext, ExpoConfig } from '@expo/config'
import path from 'path'
import fs from 'fs'

const customer = process.env.CUSTOMER
if (!customer) {
  throw new Error('Veuillez définir la variable d\'environnement CUSTOMER')
}

const configPath = path.resolve(__dirname, 'customers', customer, 'config.json')
if (!fs.existsSync(configPath)) {
  throw new Error(`Config file not found: ${configPath}`)
}

const { name, slug } = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name,
    slug,
    android: {
        package: `com.${customer}.pubgenapp`,
    },
    ios: {
        bundleIdentifier: `com.${customer}.pubgenapp`,
    }
})

# Daily Metrics

### Steps for installation

1. Clone this project

```sh
git clone https://github.com/harshithpabbati/daily-metrics.git
```

2. Change into the directory and install the dependencies

```sh
cd daily-metrics

npm install
```

3. Create a file named __.env.local__ and update it with the values from your Supabase project and Daily API:

```
NEXT_PUBLIC_SUPABASE_URL=https://app-id.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=your-public-api-key
DAILY_API_KEY=daily-public-key
```

![Image URLs](https://user-images.githubusercontent.com/43822585/130856654-ddbb99ed-2807-4ae6-9ffe-0375312d0192.png)

4. Run the server

```sh
npm run dev
```

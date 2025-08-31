# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))
- Custom domain (optional)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Ensure all files are committed**:
   - `vercel.json` ✅
   - `public/_redirects` ✅
   - `env.example` ✅
   - All source files ✅

## Step 2: Deploy to Vercel

### Option A: GitHub Integration (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure project settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Add Environment Variables** (required):
   - `VITE_WEB3FORMS_ACCESS_KEY`: Your Web3Forms access key (get from https://web3forms.com/)

6. **Click "Deploy"**

### Option B: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

## Step 3: Add Custom Domain

### 1. Purchase Domain (if you don't have one)
- **Recommended**: Namecheap, GoDaddy, or Google Domains
- **Alternative**: Use Vercel's free `.vercel.app` domain

### 2. Add Domain in Vercel Dashboard

1. **Go to your project in Vercel Dashboard**
2. **Navigate to Settings → Domains**
3. **Add your custom domain** (e.g., `habrotics.com`)
4. **Vercel will show you DNS records to configure**

### 3. Configure DNS Records

**Add these records to your domain registrar**:

#### For Root Domain (e.g., `habrotics.com`):
```
Type: A
Name: @
Value: 76.76.19.19
```

#### For www subdomain (e.g., `www.habrotics.com`):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### For Pakistan-specific subdomain (optional):
```
Type: CNAME
Name: pk
Value: cname.vercel-dns.com
```

### 4. Wait for DNS Propagation
- **Time**: 5 minutes to 48 hours
- **Check**: Use [whatsmydns.net](https://whatsmydns.net) to verify

### 5. Verify SSL Certificate
- **Automatic**: Vercel provides free SSL certificates
- **Time**: Usually 5-10 minutes after DNS propagation

## Step 4: Environment Variables (Required)

You must add the Web3Forms access key for forms to work:

1. **Go to Vercel Dashboard → Your Project → Settings → Environment Variables**
2. **Add Variable**:
   - **Name**: `VITE_WEB3FORMS_ACCESS_KEY`
   - **Value**: Your Web3Forms access key (get from https://web3forms.com/)
   - **Environment**: Production (and Preview if needed)
3. **Redeploy**: Vercel will automatically redeploy

**Note**: Without this environment variable, the consultation form will not work!

## Step 5: Test Your Deployment

### Test URLs:
- **Main site**: `https://yourdomain.com`
- **Direct access**: `https://yourdomain.com/index.html` (should redirect to `/`)
- **Non-existent page**: `https://yourdomain.com/nonexistent` (should show 404)

### Test Features:
- ✅ **Homepage loads correctly**
- ✅ **Navigation works**
- ✅ **Forms submit successfully**
- ✅ **Responsive design works**
- ✅ **Animations work**
- ✅ **404 page shows for invalid routes**

## Troubleshooting

### Common Issues:

#### 1. **404 on Refresh**
- **Solution**: The `vercel.json` and `_redirects` files handle this
- **Check**: Ensure both files are in your repository

#### 2. **Build Errors**
- **Check**: Vercel build logs in dashboard
- **Common fix**: Update Node.js version in Vercel settings

#### 3. **Domain Not Working**
- **Check DNS**: Use [whatsmydns.net](https://whatsmydns.net)
- **Wait longer**: DNS can take up to 48 hours
- **Contact support**: If still not working after 48 hours

#### 4. **Forms Not Working**
- **Check**: Environment variable `VITE_WEB3FORMS_ACCESS_KEY` is set correctly
- **Check**: Web3Forms access key is valid and active
- **Test**: Try submitting a test form
- **Check email**: Look for form submissions in your email

## Performance Optimization

### Vercel automatically provides:
- ✅ **CDN**: Global content delivery
- ✅ **SSL**: Free HTTPS certificates
- ✅ **Caching**: Optimized asset caching
- ✅ **Compression**: Gzip compression
- ✅ **Edge Functions**: Serverless functions (if needed)

### Your configuration includes:
- ✅ **Code splitting**: Vendor and UI chunks
- ✅ **Asset optimization**: Long-term caching for static assets
- ✅ **Security headers**: XSS protection, content type options

## Monitoring

### Vercel Analytics (Optional):
1. **Enable in project settings**
2. **Track**: Page views, performance, errors
3. **Free tier**: 100,000 events/month

### Custom Analytics:
- **Google Analytics**: Add tracking code to `index.html`
- **Hotjar**: Add for user behavior tracking

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: Available in dashboard
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

🎉 **Your HABROTICS SOLUTIONS website is now live!**

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'AWS DevOps CI/CD Pipeline is Live!', 
    status: 'running',
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.get('/api/services', (req, res) => {
  res.json({
    services: ['EC2', 'S3', 'CodePipeline', 'CodeBuild', 'CodeDeploy', 'CloudWatch']
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
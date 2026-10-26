import { Router } from 'express';

// Create a new router instance
const router = Router();

// TODO: Add import statements for controllers and middleware
import { addDemoHeaders } from '../middleware/demo/headers.js';
import { catalogPage, courseDetailPage } from './catalog/catalog.js';
import { facultyListPage, facultyDetailPage } from './faculty/faculty.js';
import { homePage, aboutPage, demoPage, testErrorPage } from './index.js';
import contactRoutes from './forms/contact.js';
import registrationRoutes from './forms/registration.js';

// TODO: Add route definitions
// Home and basic pages
router.get('/', homePage);
router.get('/about', aboutPage);

// Course catalog routes
router.get('/catalog', catalogPage);
router.get('/catalog/:slugId', courseDetailPage);

// Faculty routes
router.get('/faculty', facultyListPage);
router.get('/faculty/:facultySlug', facultyDetailPage);

// Contact form routes
router.use('/contact', contactRoutes);

// Add contact-specific styles to all contact routes
router.use('/contact', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/contact.css">');
    next();
});

// Demo page with special middleware
router.get('/demo', addDemoHeaders, demoPage);
// Add registration-specific styles to all registration routes

// Registration routes
router.use('/register', registrationRoutes);
router.use('/register', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/registration.css">');
    next();
});

// Route to trigger a test error
router.get('/test-error', testErrorPage);

export default router;
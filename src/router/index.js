import { createRouter, createWebHistory } from 'vue-router';

import { LOGIN_ROUTE } from '@/routes/login.route';
import { COOKIE_POLICY_ROUTE } from '@/routes/cooke.policy.route';
import { WORKS_ROUTE } from '@/routes/works.route';
import { PRIVACY_POLICY_ROUTE } from '@/routes/privacy.policy.route';
import { DISCLAMER_ROUTE } from '@/routes/disclamer.route';
import { ROUTE_404 } from '@/routes/404.route.js';
import { AUTHENTICATION_INDEX_ROUTE } from '@/routes/authentication/authentication.index.route';
import { APPLICATION_INDEX_ROUTE } from '@/routes/application/application.index.route';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    AUTHENTICATION_INDEX_ROUTE,
    LOGIN_ROUTE,
    COOKIE_POLICY_ROUTE,
    WORKS_ROUTE,
    PRIVACY_POLICY_ROUTE,
    DISCLAMER_ROUTE,
    ROUTE_404,
    APPLICATION_INDEX_ROUTE,
  ],
});

export default router;

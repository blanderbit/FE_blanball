import 'regenerator-runtime/runtime'
import { resolverFunctions } from "./resolver.functions";
import { finishSpinner, startSpinner } from "../loading-worker/loading.worker.js";
import { VueResolver } from "@blanderbit/vue-resolver";
import {ROUTES} from "../../router";


export const routerAuthResolver = new VueResolver()
    .registerResolverFirstWorker(resolverFunctions.isUserAuthorized)
    .registerResolverFirstWorkerError(resolverFunctions.isAuthorizedError)
    .registerResolverSecondWorkerError(resolverFunctions.isResolveDataError)
    .registerAfterIntercept(finishSpinner)
    .registerBeforeIntercept(startSpinner);

export const routerDataResolver = new VueResolver()
    .registerResolverSecondWorkerError(resolverFunctions.isResolveDataError)
    .registerAfterIntercept(finishSpinner)
    .registerBeforeIntercept(startSpinner);

export const routerResolverByLoginPage = routerAuthResolver.routeInterceptor(
    () => ({}),
    {
        afterIntercept: ({ next }) => {
            next(ROUTES.APPLICATION.EVENTS.absolute);
            finishSpinner();
        },
        resolveFirstWorkerError: ({ next }) => {
            next(true);
            finishSpinner();
        },
    }
);
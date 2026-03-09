import { DocumentNode } from 'graphql';
import { useApolloMutation, useApolloQuery } from './apollo.hooks';
import { OperationVariables } from '@apollo/client';

export function createQueryHook<TData, TVariables extends OperationVariables = {}>(query: DocumentNode) {
    return (variables?: TVariables, options = {}) => useApolloQuery<TData>(query, variables, options);
}

export function createMutationHook<TData, TVariables extends OperationVariables = {}>(mutation: DocumentNode) {
    return (options = {}) => useApolloMutation<TData, TVariables>(mutation, options);
}

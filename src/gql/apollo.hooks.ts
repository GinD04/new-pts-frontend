import { OperationVariables } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { DocumentNode } from 'graphql';

export const useApolloQuery = <TData>(query: DocumentNode, variables?: OperationVariables, options = {}) => {
    return useQuery<TData>(query, {
        variables,
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
        ...options,
    });
};

export const useApolloMutation = <TData, TVariables extends OperationVariables = {}>(
    mutation: DocumentNode,
    options = {},
) => {
    return useMutation<TData, TVariables>(mutation, {
        errorPolicy: 'all',
        ...options,
    });
};

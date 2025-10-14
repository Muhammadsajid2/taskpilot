import { useQuery } from 'react-query'

const useCustomQuery = (queryKey, queryFunction, dependency, retryAttempt) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: queryFunction,
    enabled: !!dependency,
    retry: retryAttempt ?? true,
    // refetchOnWindowFocus: false,
  })

  return { data, isLoading, error, refetch }
}
export default useCustomQuery

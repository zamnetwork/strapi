import http from 'k6/http';
import { sleep, group } from 'k6';

export const options = {
  vus: 1,
  stages: [{ duration: '60s', target: 1 }],
  summaryTrendStats: ['max', 'p(95)'],
};

export default function () {
  // This query is very slow, we should be able to improve it
  group('Company - Nested components', function () {
    http.get('http://localhost:1337/api/companies?populate[0]=locations.departments', {
      tags: { my_tag: 'Populate all fields' },
    });
  });

  sleep(5);
}

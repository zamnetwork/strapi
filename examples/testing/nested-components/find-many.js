import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
  vus: 10,
  stages: [{ duration: '15s', target: 20 }],
  summaryTrendStats: ['max', 'p(95)'],
};

export default function () {
  group('Company - Nested components', function () {
    http.get('http://localhost:1337/api/companies', {
      tags: { my_tag: 'Find Many' },
    });
  });

  sleep(1);
}

import http from 'k6/http';
import { sleep, group } from 'k6';

export const options = {
  vus: 10,
  stages: [{ duration: '20s', target: 20 }],
  // thresholds: {
  //   http_req_failed: ['rate<0.01'], // http errors should be less than 1%
  //   http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
  // },
  summaryTrendStats: ['max', 'p(95)'],
};

export default function () {
  group('Books - Many fields', function () {
    http.get('http://localhost:1337/api/books', {
      tags: { my_tag: 'Get All' },
    });
    http.get('http://localhost:1337/api/books?populate=*', {
      tags: { my_tag: 'Populate all fields' },
    });
    http.get('http://localhost:1337/api/books?sort[0]=title&sort[1]=subtitle', {
      tags: { my_tag: 'Sort by many fields' },
    });
  });

  sleep(1);
}

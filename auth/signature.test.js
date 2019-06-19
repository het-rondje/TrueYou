const NodeRSA = require('node-rsa');

const message = 'dit is een test';

// Signing signature
const privateKey = new NodeRSA();
privateKey.importKey('-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvSLIsx8bm//QG\nrDMRETTzKi502kSa29c/gRj8E4eC0DaxTuYQ8j8ANoBl1I/366aICSRczD+N1v5a\nawn7kU1vZKhr6QosO8Ckln9RZPaxopOwfT0C25r4Ntf/ImY7GlV0gRAks0xYQXJ8\nDkk/DtzJ1hAbdlmYjVPhgRqX3MfvumptKPHcCEWsCidBJcWX2X4VJp6lVNmxBRJB\neCyaCcQpNhatwOvCxGkBRATfapwR5DtIc5O/6u3PgfEmwr8zuesN4405ZFVG9yT1\ndcDk/OrK1MVZNrWhMSXg88kx1OMH3UZSyCeUwT0saJQup3QPuWr0mdrEZ2tptBjm\n+U07mnJPAgMBAAECggEAY3sjvGyJw5LioWLb/MTCQ3veL+2s4CMDMASJ9I706tZX\nJBx+UIHcJbfI+YJBT1jMBAsEOzKko1CwvQpg+QkHZMBBIjV50476D69mhQCDTl/R\n6Gm71cJjWpptzlxsnwCcHWoeimXEX5aNbkEBayt5PYgjTiLGSOF1CNgoCqaARtqY\nrSbro/ZEDHrzediG5eGJnUWUFUWmPtpatfYcWjpQBbrI2n9YT0y/aRI4g7OyVCHh\nWLaJ7vi+KR7MzynNZV23aOYBTz7kp1RDh7+/ZSu0mW2dy+adzxyucll6Vg/riaM6\nnEPpB4Dg0b+l0PlSn+uGy2tHA2Dvvgx5PQWPs3KgEQKBgQDwTBfVzTdbHRK34BYO\nPzoIs/WRwBvPtxx3OLLhHSAjCEhRSKCeTpZWJepLZjf44HZtOP6xLmH8wQo+/6x4\nQ1vgqUeHGSJRWRHEWT+F43s4Xi87z83oiHQSRPzcU7oNT+Q9xVlWybyNbOPpiZX7\n1TPIKuH+DxxZsfgcnX+w8xqc1wKBgQC6vQC5NAf79aRQTGuZ7Ux938hj8ri1XwuC\nsCvvAOWDCZPKTOegE1c73yxCtsL5JQ1wDZlbzYM1HPEpTGTFE3YQBM6cJTK+UtSg\nQQILl4bm3oaAecMlDwfaSlR7tNBm2yUL1QQD+7o4kFysrYMla/yOY19uUd3sYud7\nWdtr8kHvSQKBgC4y8wIwCkyCMm8XriXfEhFKSBRVkwNEeTySshGFv//8P6shA4Bs\nK4s0ju8gH/LBdQNaydzWxhAKLSYfkdEtYiS3ZwEaW/a34SqW3henvLEBqqMdOMFU\nOryodtUFY+fbTE5z+tEsyAuIu+jSgvt/6gy58ekejpzQEputzDcBBkTRAoGAYlNa\nqionehfhqRZUIfy9JhpLHbWUZIvjN7EjsPk74D+Ovhq4a6VDbZcZaxdoml9UMAg5\nFAmmaLUQlrpO5SZWKCEf2UAM9AIRS0Bvn0LuGWpaUBPNGRpM/DffPDP89+u0GgLT\n1nUZnOcGpTXHtFCj7yWL/j7FJ878LAsoajJpXWECgYEAk0aOD84QtcR464HXZj7L\nU3mCUAWLUPZJ1wujb3pepXKqfypeDkeYs+nKFTjSN0rwaSWwNAVO67Uz0svcXymn\n40crbCQ5O2zz2BlHpAaQQ6URV8CkCmwxz8pRWw/6vDmCM1QOnKYgTjyC8VBmhsKp\ntJAfQtAW8EcM05xBNXGEJpA=\n-----END PRIVATE KEY-----');
const signature = privateKey.sign(Buffer.from(message), 'hex', 'hex');
console.log('Generated signature: ', signature);

// Verifying signature
const publicKey = new NodeRSA();
publicKey.importKey('-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr0iyLMfG5v/0BqwzERE0\n8youdNpEmtvXP4EY/BOHgtA2sU7mEPI/ADaAZdSP9+umiAkkXMw/jdb+WmsJ+5FN\nb2Soa+kKLDvApJZ/UWT2saKTsH09Atua+DbX/yJmOxpVdIEQJLNMWEFyfA5JPw7c\nydYQG3ZZmI1T4YEal9zH77pqbSjx3AhFrAonQSXFl9l+FSaepVTZsQUSQXgsmgnE\nKTYWrcDrwsRpAUQE32qcEeQ7SHOTv+rtz4HxJsK/M7nrDeONOWRVRvck9XXA5Pzq\nytTFWTa1oTEl4PPJMdTjB91GUsgnlME9LGiULqd0D7lq9JnaxGdrabQY5vlNO5py\nTwIDAQAB\n-----END PUBLIC KEY-----');
const result = publicKey.verify(Buffer.from(message), signature, 'hex', 'hex');
console.log('Signature is: ', result);

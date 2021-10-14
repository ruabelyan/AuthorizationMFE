const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

function joinURL(baseURL: string, url: string): string {
  return `${baseURL}/${url}`;
}
export interface ServiceInterface {
  domain: string;
}

export class Service {
  domain: string;
  constructor(public Domain) {
    this.domain = Domain;
  }

  request(url: string, method: string = 'POST', data: string[] = null) {
    url = joinURL(this.domain, url);
    const options = {
      headers,
      method,
      body: JSON.stringify({ ...data })
    };
    if (data) {
      options.body = JSON.stringify({ ...data });
    }
    return fetch(url, options);
  }
  post(url: string, data) {
    const method = 'POST';
    return this.request(url, method, data).then((res) => res.json());
  }
  get(url, id) {
    const method = 'GET';
    if (id) {
      //fetch single record
      url = `${url}/${id}`;
    }
    return this.request(url, method).then((res) => res.json());
  }
  delete(url, id) {
    const method = 'DELETE';
    if (id) {
      url = `${url}/${id}`;
    }
    return this.request(url, method).then((res) => res.json());
  }
  put() {}
}


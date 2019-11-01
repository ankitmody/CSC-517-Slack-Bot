import scrapy
import re
import string

class BrickSetSpider(scrapy.Spider):
    name = "github_spider"
    start_urls = ['https://developer.github.com/v3/']

    def parse(self, response):
        for optgroupdict in response.css('optgroup'):
            yield{
                'label': optgroupdict.css('optgroup::attr(label)').get(),
                'value': optgroupdict.css('option::attr(value)').getall(),
            }
            for next_page in optgroupdict.css('option::attr(value)').extract():
                if next_page is not None:
                    url = response.urljoin(next_page)
                    yield scrapy.Request(url, callback = self.getLeftLinks)

    def getLeftLinks(self, response):
        methods, endpoint = [], []
        headers = response.xpath('//ul[@id="markdown-toc"]/li/a/text()').getall()
        #masterdict = {}
        #i = 0
        for attr in response.css('pre code'):
            if len(attr.xpath('text()').extract())>0 and ':org' not in attr.xpath('text()').extract()[0] and ('GET' in attr.xpath('text()').extract()[0] or 'POST' in attr.xpath('text()').extract()[0] or 'PUT' in attr.xpath('text()').extract()[0] or 'DELETE' in attr.xpath('text()').extract()[0] or 'PATCH' in attr.xpath('text()').extract()[0]):
                method, url = attr.xpath('text()').extract()[0].replace('\n','').split(' ')
                methods.append(method)
                endpoint.append(url)
                # para = url.split("/")
                # params = {}
                # required = {'required': 'true'}
                # for p in para:
                #     if ':' in p:
                #         p.replace(':','')
                #         params[p] = required
                # masterdict[headers[i]] = params
        print('\n------------------')
        print(headers)
        print('\n*********************')
        print(methods)
        print(endpoint)
        yield{
            'headers': headers,
            'methods': methods,
            'endpoints': endpoint
        }
        
                     
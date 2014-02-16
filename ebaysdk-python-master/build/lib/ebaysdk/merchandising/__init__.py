# -*- coding: utf-8 -*-

'''
© 2012-2013 eBay Software Foundation
Authored by: Tim Keefer
Licensed under CDDL 1.0
'''

import os

from ebaysdk.finding import Connection as FindingConnection
from ebaysdk.utils import to_xml

class Connection(FindingConnection):
    """Connection class for the Merchandising service

    API documentation:
    http://developer.ebay.com/products/merchandising/

    Supported calls:
    getMostWatchedItems
    getSimilarItems
    getTopSellingProducts
    (all others, see API docs)

    Doctests:
    >>> s = Connection(config_file=os.environ.get('EBAY_YAML'))
    >>> retval = s.execute('getMostWatchedItems', {'maxResults': 3})
    >>> print(s.response_obj().ack)
    Success
    >>> print(s.error())
    None
    """

    def __init__(self, **kwargs):
        """Merchandising class constructor.

        Keyword arguments:
        domain        -- API endpoint (default: open.api.ebay.com)
        config_file   -- YAML defaults (default: ebay.yaml)
        debug         -- debugging enabled (default: False)
        warnings      -- warnings enabled (default: False)
        uri           -- API endpoint uri (default: /MerchandisingService)
        appid         -- eBay application id
        siteid        -- eBay country site id (default: 0 (US))
        compatibility -- version number (default: 799)
        https         -- execute of https (default: True)
        proxy_host    -- proxy hostname
        proxy_port    -- proxy port number
        timeout       -- HTTP request timeout (default: 20)
        parallel      -- ebaysdk parallel object
        response_encoding -- API encoding (default: XML)
        request_encoding  -- API encoding (default: XML)
        """

        super(Connection, self).__init__(**kwargs)

        self.config.set('uri', '/MerchandisingService', force=True)
        self.config.set('service', 'MerchandisingService', force=True)

    def build_request_headers(self, verb):
        return {
            "X-EBAY-API-VERSION": self.config.get('version', ''),
            "EBAY-SOA-CONSUMER-ID": self.config.get('appid', ''),
            "X-EBAY-API-SITEID":  self.config.get('siteid', ''),
            "X-EBAY-SOA-OPERATION-NAME": verb,
            "X-EBAY-API-REQUEST-ENCODING": "XML",
            "X-EBAY-SOA-SERVICE-NAME": self.config.get('service', ''),
            "Content-Type": "text/xml"
        }


    def build_request_data(self, verb, data):
        xml = "<?xml version='1.0' encoding='utf-8'?>"
        xml += "<" + verb + "Request xmlns=\"http://www.ebay.com/marketplace/services\">"
        xml += to_xml(data) or ''
        xml += "</" + verb + "Request>"

        return xml

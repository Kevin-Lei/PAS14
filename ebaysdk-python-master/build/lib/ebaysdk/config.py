# -*- coding: utf-8 -*-

'''
© 2012-2013 eBay Software Foundation
Authored by: Tim Keefer
Licensed under CDDL 1.0
'''

import os
import yaml

from ebaysdk import log

class Config(object):
    """Config Class for all APIs connections

    >>> c = Config(domain='api.ebay.com')
    >>> print(c.file())
    ebay.yaml
    >>> c.set('fname', 'tim')
    >>> c.get('fname')
    'tim'
    >>> c.get('missingkey', 'defaultvalue')
    'defaultvalue'
    >>> c.set('number', 22)
    >>> c.get('number')
    22
    """

    def __init__(self, domain, connection_kwargs=dict(), config_file='ebay.yaml'):
        self.config_file=config_file
        self.domain=domain
        self.values=dict()
        self.config_file_used=[]
        self.connection_kwargs=connection_kwargs

        # populate defaults        
        self._populate_yaml_defaults()

    def _populate_yaml_defaults(self):
        "Returns a dictionary of YAML defaults."

        # check for absolute path
        if self.config_file and os.path.exists(self.config_file):
            self.config_file_used=self.config_file
            fhandle = open(self.config_file, "r")
            dataobj = yaml.load(fhandle.read())

            for k, val in dataobj.get(self.domain, {}).items():
                self.set(k, val)

            return self

        # check other directories
        dirs = ['.', os.environ.get('HOME'), '/etc']
        for mydir in dirs:
            myfile = "%s/%s" % (mydir, self.config_file)

            if os.path.exists(myfile):
                self.config_file_used=myfile

                fhandle = open(myfile, "r")
                dataobj = yaml.load(fhandle.read())

                for k, val in dataobj.get(self.domain, {}).items():
                    self.set(k, val)

                return self

    def file(self):
        return self.config_file_used

    def get(self, cKey, defaultValue=None):
        #log.debug('get: %s=%s' % (cKey, self.values.get(cKey, defaultValue)))
        return self.values.get(cKey, defaultValue)

    def set(self, cKey, defaultValue, force=False):
        
        if force:
            #log.debug('set (force): %s=%s' % (cKey, defaultValue))
            self.values.update({cKey: defaultValue})
                    
        elif cKey in self.connection_kwargs and self.connection_kwargs[cKey] is not None:
            #log.debug('set: %s=%s' % (cKey, self.connection_kwargs[cKey]))
            self.values.update({cKey: self.connection_kwargs[cKey]})

        # otherwise, use yaml default and then fall back to
        # the default set in the __init__()
        else:
            if not cKey in self.values:
                #log.debug('set: %s=%s' % (cKey, defaultValue))
                self.values.update({cKey: defaultValue})
            else:
                pass

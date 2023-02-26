import * as webpack from 'webpack';
import * as ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';

export default {
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mf1',
      library: { type: 'var', name: 'mf1' },
      filename: 'remoteEntry.js',
      exposes: {
        Module: './projects/mf1/src/app/mf1/mf1.module.ts',
      },
      shared: {
        '@angular/core': { eager: true },
        '@angular/common': { eager: true },
        '@angular/common/': { eager: true },
        '@angular/router': { eager: true },
        '@angular/cdk': { eager: true },
        '@angular/cdk/': { eager: true },
        '@angular/material': { eager: true },
        '@angular/material/': { eager: true },
        rxjs: { eager: true },
        'rxjs/': { eager: true },
        'event-bus-mf-demo': { eager: true, singleton: true },
      },
    }),
  ],
} as webpack.Configuration;

import * as webpack from 'webpack';
import * as ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';

export default {
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mf2',
      library: { type: 'var', name: 'mf2' },
      filename: 'remoteEntry.js',
      exposes: {
        Module: './projects/mf2/src/app/mf2/mf2.module.ts',
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

---
title: Movie Scraping
createTime: 2024/09/06 17:24:30
permalink: /guide/nas/movie/
tags:
  - movie
  - nas
---

:::tip

Technical stacks:

- Overseer
- Jackett
- Sonarr
- Radarr
- Qbittorrent
- Plex

:::

## Dockerfile

```yml
version: "3"
services:
  jackett:
    image: lscr.io/linuxserver/jackett:latest
    container_name: jackett
    networks:
      - movie-network
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
      - AUTO_UPDATE=true
    volumes:
      - /share/CACHEDEV2_DATA/Container/jackett/config:/config
      - /share/CACHEDEV2_DATA/TV:/downloads
    ports:
      - 9117:9117
    restart: unless-stopped

  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    networks:
      - movie-network
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
    volumes:
      - /share/CACHEDEV2_DATA/Container/radarr/config:/config
      - /share/CACHEDEV2_DATA/TV:/movies #optional
      - /share/CACHEDEV1_DATA/watch:/downloads #optional
    ports:
      - 7878:7878
    restart: unless-stopped

  flaresolverr:
    image: ghcr.io/flaresolverr/flaresolverr:latest
    container_name: flaresolverr
    networks:
      - movie-network
    environment:
      - LOG_LEVEL=info
    ports:
      - 8191:8191
    restart: unless-stopped
  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - WEBUI_PORT=8080
      - TORRENTING_PORT=6881
    volumes:
      - /share/CACHEDEV2_DATA/Container/qbittorrent/config:/config
      - /share/CACHEDEV1_DATA/watch:/downloads #optional
    ports:
      - 8080:8080
      - 6881:6881
      - 6881:6881/udp
    restart: unless-stopped
    networks:
      - movie-network
  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
    volumes:
      - /share/CACHEDEV2_DATA/Container/sonarr/config:/config
      - /share/CACHEDEV2_DATA/TV:/tv #optional
      - /share/CACHEDEV1_DATA/watch:/downloads #optional
    ports:
      - 8989:8989
    networks:
      - movie-network
    restart: unless-stopped
  overseerr:
    image: lscr.io/linuxserver/overseerr:latest
    container_name: overseerr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
    ports:
      - 5055:5055
    volumes:
      - /share/CACHEDEV2_DATA/Container/overseerr/config:/app/config
    networks:
      - movie-network
    restart: unless-stopped
  plex:
    image: lscr.io/linuxserver/plex:latest
    container_name: plex
    network_mode: host
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
      - VERSION=docker
      - PLEX_CLAIM=claim-VKDLucfjyvDW92V4t9p2
    volumes:
      - /share/CACHEDEV2_DATA/Container/plex/config:/config
      - /share/CACHEDEV2_DATA/TV:/tv
      - /share/CACHEDEV2_DATA/TV:/movies
    restart: unless-stopped
networks:
  movie-network:
    driver: bridge
```

## Jackett

Jackett (_[link](https://github.com/Jackett/Jackett)_)

::: center
<img src="/images/nas/movie/jackett_indexer.jpg" width="600">
<img src="/images/nas/movie/jackett_config.jpg" width="600">
:::

FlareSolverr: [https://github.com/FlareSolverr/FlareSolverr](https://github.com/FlareSolverr/FlareSolverr)

OMDB API: [https://www.omdbapi.com](https://www.omdbapi.com)

## Radarr

Related Articles:

- [https://blog.left.pink/archives/3760](https://blog.left.pink/archives/3760)

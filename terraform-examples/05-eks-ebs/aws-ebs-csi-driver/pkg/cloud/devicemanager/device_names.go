/*
Copyright 2019 The Kubernetes Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package devicemanager

// EC2 allowed EBS device names, discovered by trial and error
// Notable (undocumented) restrictions include:
// /dev/xvda is broken on Windows (despite the API allowing it)
// /dev/xvddx is the last allowed device name in the /dev/xvd{a-z}{a-z} series
// /dev/xvdc{a-z} don't work on some Windows instance types
//
// These names are ordered such that /dev/xvda{a-z} and /dev/xvdb{a-z} are
// the first 52 names in the list. This is intentional, so that those names
// are always chosen on non-nitro instances. Non-nitro instances have weird
// behavior with /dev/sd{a-z} and /dev/xvd{a-z} that cause such names to
// conflict and prevent each other from mounting. Because non-nitro instances
// are limited to 39 volumes, and are long-term deprecated in favor of nitro,
// this should be long-term safe.
var deviceNames = []string{
	"/dev/xvdaa",
	"/dev/xvdab",
	"/dev/xvdac",
	"/dev/xvdad",
	"/dev/xvdae",
	"/dev/xvdaf",
	"/dev/xvdag",
	"/dev/xvdah",
	"/dev/xvdai",
	"/dev/xvdaj",
	"/dev/xvdak",
	"/dev/xvdal",
	"/dev/xvdam",
	"/dev/xvdan",
	"/dev/xvdao",
	"/dev/xvdap",
	"/dev/xvdaq",
	"/dev/xvdar",
	"/dev/xvdas",
	"/dev/xvdat",
	"/dev/xvdau",
	"/dev/xvdav",
	"/dev/xvdaw",
	"/dev/xvdax",
	"/dev/xvday",
	"/dev/xvdaz",
	"/dev/xvdba",
	"/dev/xvdbb",
	"/dev/xvdbc",
	"/dev/xvdbd",
	"/dev/xvdbe",
	"/dev/xvdbf",
	"/dev/xvdbg",
	"/dev/xvdbh",
	"/dev/xvdbi",
	"/dev/xvdbj",
	"/dev/xvdbk",
	"/dev/xvdbl",
	"/dev/xvdbm",
	"/dev/xvdbn",
	"/dev/xvdbo",
	"/dev/xvdbp",
	"/dev/xvdbq",
	"/dev/xvdbr",
	"/dev/xvdbs",
	"/dev/xvdbt",
	"/dev/xvdbu",
	"/dev/xvdbv",
	"/dev/xvdbw",
	"/dev/xvdbx",
	"/dev/xvdby",
	"/dev/xvdbz",
	"/dev/xvdda",
	"/dev/xvddb",
	"/dev/xvddc",
	"/dev/xvddd",
	"/dev/xvdde",
	"/dev/xvddf",
	"/dev/xvddg",
	"/dev/xvddh",
	"/dev/xvddi",
	"/dev/xvddj",
	"/dev/xvddk",
	"/dev/xvddl",
	"/dev/xvddm",
	"/dev/xvddn",
	"/dev/xvddo",
	"/dev/xvddp",
	"/dev/xvddq",
	"/dev/xvddr",
	"/dev/xvdds",
	"/dev/xvddt",
	"/dev/xvddu",
	"/dev/xvddv",
	"/dev/xvddw",
	"/dev/xvddx",
	"/dev/xvdb",
	"/dev/xvdc",
	"/dev/xvdd",
	"/dev/xvde",
	"/dev/xvdf",
	"/dev/xvdg",
	"/dev/xvdh",
	"/dev/xvdi",
	"/dev/xvdj",
	"/dev/xvdk",
	"/dev/xvdl",
	"/dev/xvdm",
	"/dev/xvdn",
	"/dev/xvdo",
	"/dev/xvdp",
	"/dev/xvdq",
	"/dev/xvdr",
	"/dev/xvds",
	"/dev/xvdt",
	"/dev/xvdu",
	"/dev/xvdv",
	"/dev/xvdw",
	"/dev/xvdx",
	"/dev/xvdy",
	"/dev/xvdz",
	"/dev/sdb",
	"/dev/sdc",
	"/dev/sdd",
	"/dev/sde",
	"/dev/sdf",
	"/dev/sdg",
	"/dev/sdh",
	"/dev/sdi",
	"/dev/sdj",
	"/dev/sdk",
	"/dev/sdl",
	"/dev/sdm",
	"/dev/sdn",
	"/dev/sdo",
	"/dev/sdp",
	"/dev/sdq",
	"/dev/sdr",
	"/dev/sds",
	"/dev/sdt",
	"/dev/sdu",
	"/dev/sdv",
	"/dev/sdw",
	"/dev/sdx",
	"/dev/sdy",
	"/dev/sdz",
	"/dev/sda2",
}
